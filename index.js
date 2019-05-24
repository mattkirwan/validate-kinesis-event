

module.exports.validateKinesisEvent = event => {

    if (typeof event !== "object")
        return Promise.reject("Kinesis event is not an object")

    if (!event.hasOwnProperty("Records"))
        return Promise.reject("Kinesis event does not contain a Records key")
        
    if (!(event.Records instanceof Array))
        return Promise.reject("Kinesis event.Records is not an Array")

    if (event.Records.length === 0)
        return Promise.reject("Kinesis event.Records has no records to process")

    if (event.Records.length !== event.Records.filter(r => typeof r === 'object').length)
        return Promise.reject("Kinesis event.Records does not contain only Objects")





    return Promise.resolve()

}


