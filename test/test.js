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

})