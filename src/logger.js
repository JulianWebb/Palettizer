module.exports = class {
    constructor(configuration) {
        this.configuration = {};
        this.configuration.name = configuration.name ?? "Logger";
        this.configuration.timestamp = configuration.timestamp ?? true;
    }

    get timestamp() {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let stringHour = hour > 9? hour: `0${hour}`;
        let stringMinute = minute > 9? minute: `0${minute}`;
        return `[${stringHour}:${stringMinute}]`;
    }

    get name() {
        return `[${this.configuration.name}]`;
    }

    print(prefix, message) {
        if (Array.isArray(message)) {
            message.unshift(prefix);
            console.log.apply(this, message);
        }

        console.log.apply(this, [prefix, message]);
    }

    get logPrefix() {
        return this.configuration.timestamp? `${this.timestamp}${this.name}`: this.name;
    }
    log(message) {
        this.print(this.logPrefix, message);
        
    }
    
    error(message) {
        this.print(`${this.logPrefix}[ERROR]`, message);
    }

    warn(message) {
        this.print(`${this.logPrefix}[WARN]`, message);
    }
}