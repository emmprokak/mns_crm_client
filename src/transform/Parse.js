class Parse {
    static parseTableValue(val, fieldName, objectName){
        if(!val){
            return "-";
        }


        if(fieldName === "birthdate"){
            return val.slice(0, 10);
        }

        return val;
    }

    static firstLetterCapital(inputStr){
        const firstLetter = inputStr.charAt(0)

        const firstLetterCap = firstLetter.toUpperCase()

        const remainingLetters = inputStr.slice(1)

        return firstLetterCap + remainingLetters;
    }
}

export default Parse;