const {validateKinesisEvent} = require("../index")

const chai = require("chai")
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised)

chai.should()

describe("Module", () => {
    it("should return a function", function(done) {
        validateKinesisEvent.should.be.a('function')

        done()
    })
})

describe("#validateKinesisEvent()", () => {

    it("should reject if event passed is not an object", () => {
        let event = "This is not an object"

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event is not an object")
    })

    it("should reject if event passed does not contain a Records key", () => {
        let event = {NotARecordsKey: []}

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event does not contain a Records key")
    })

    it("should reject if event.Records is not an Array", () => {
        let event = {Records: "Not an Array"}

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event.Records is not an Array")
    })

    it("should reject if event.Records is empty", () => {
        let event = {Records:[]}

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event.Records has no records to process")
    })

    it("should reject if event.Records does not contain an Array of only Objects", () => {
        let event = {Records:[
            {an: "object"},
            "Not an object",
            {another: "object"},
        ]}

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event.Records does not contain only Objects")
    })

    it("should reject if a record within event.Records does not contain a kinesis key", () => {
        let event = {Records:[
            {NotAKinesisKey: {}},
            {kinesis: {}},
        ]}

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event.Record record does not contain a kinesis key")
    })

    it("should reject if a kinesis record within event.Records does not contain a data key", () => {
        let event = {Records:[
            {kinesis: {NotAKinesisKey: ""}},
            {kinesis: {data: ""}},
        ]}

        return validateKinesisEvent(event).should.be.rejectedWith("Kinesis event.Record kinesis record does not contain a data key")
    })

    it("should resolve if a valid event is passed", () => {
        let event = require("./fixtures.json")

        return validateKinesisEvent(event).should.be.fulfilled.and.eventually.equal("Valid Kinesis event")
    })

})