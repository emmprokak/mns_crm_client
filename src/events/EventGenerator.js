class EventGenerator{

    static getEvent(name, source, value){
        return {
            name, source, value
        }
    }

    static getRelatedLinkEvent(entryId, entityName){
        return {
            entryId, entityName
        }
    }
}

export default EventGenerator;