module.exports.validateKinesisEvent = event => {
    return new Promise((resolve, reject) => {
        if (typeof event !== "object")
            reject("Kinesis event is not an object")

        if (!event.hasOwnProperty("Records"))
            reject("Kinesis event does not contain a Records key")
            
        if (!(event.Records instanceof Array))
            reject("Kinesis event.Records is not an Array")

        if (event.Records.length === 0)
            reject("Kinesis event.Records has no records to process")

        if (event.Records.length !== event.Records.filter(r => typeof r === 'object').length)
            reject("Kinesis event.Records does not contain only Objects")

        if (event.Records.length !== event.Records.filter(r => r.hasOwnProperty("kinesis")).length)
            reject("Kinesis event.Record record does not contain a kinesis key")
        
        if (event.Records.map(r => r.kinesis).length !== event.Records.map(r => r).filter(r => r.kinesis.hasOwnProperty("data")).length)
            reject("Kinesis event.Record kinesis record does not contain a data key")

        resolve("Valid Kinesis event")
    })
}