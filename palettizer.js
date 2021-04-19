const fs = require('fs');
const express = require('express');
const axios = require('axios');
const { request } = require('express');

module.exports = class {
    constructor(configuration, logger) {
        this.logger = logger ?? {
            log: () => void 0,
            error: () => void 0,
            warn: () => void 0
        }
        logger.log("Starting Palettizer")
        this.app = new express();
        this.app.use(express.json());
        this.configuration = {};
        this.configuration.componentLocation = configuration?.componentLocation ?? "./components/";
        this.configuration.appPort = configuration?.port ?? 3456;

        this.components = new Map();
        logger.log("Loading Components");
        let components = fs.readdirSync(this.configuration.componentLocation);
        components.forEach((componentScript) => {
            if (!componentScript.endsWith(".component.js")) return;
            var component = require(this.configuration.componentLocation + componentScript);
            this.components.set(component.name, component);
            logger.log(`Loading Component: ${component.name}`)
            this.app.post(`/${component.route}`, (request, response) => {
                if (typeof request.body.colors != "object" && !Array.isArray(request.body.colours)) {
                    return response.status(400).json({
                        response: "error",
                        description: "Missing 'colors' array in request body"
                    });
                }
                let fileName = `${request.body.name ?? "palette"}.${component.fileExtension}"`;
                console.log(request.body);
                let generatedPalette = component.generate(request.body);
                if (generatedPalette.error) {
                    response.status(400).json({
                        response: "error",
                        description: generatedPalette.error
                    })
                }

                response.set({
                    "Content-Type" : component.contentType,
                    "Content-Disposition" : `attachment; filename="${fileName}`
                }).status(200).send(generatedPalette);
                
            });
        });
    }

    listen(port) {
        if (port) {
            this.app.listen(port);
        } else {
            this.app.listen(this.configuration.port);
        }
    }
}
