import {AUTH_FIELDS, AUTH_PROPERTY_CONFIGS} from "../../constants/auth.constants.js"
import { TASK_FEILDS, TASK_PROPERTY_CONFIGS, TASK_REQUIRED_POST_FIELDS } from "../../constants/tasks.constants.js"

const capatilize = (str) => str && str[0].toUpperCase() + str.slice(1)

const validateProperties = (dataObj, key, datatype, min_range, max_range) => {
    const validationResults = {acceptable : true}
    let validationEntity = dataObj[key]

    if(validationEntity === null || validationEntity === undefined){
        validationResults.acceptable = false
        validationResults.message = `${capatilize(key)} is required`
        return validationResults
    }

    if(typeof validationEntity !== datatype){
        validationResults.acceptable = false
        validationResults.message = `${capatilize(key)} is expected to be ${datatype} but got ${typeof validationEntity}`
        return validationResults
    }

    if (datatype === "string"){
        validationEntity = validationEntity.trim()
    
        if(!validationEntity){
            validationResults.acceptable = false
            validationResults.message = `${capatilize(key)} is required`
            return validationResults
        }
    }

    if(min_range !== undefined && max_range !== undefined){
        if(validationEntity.length < min_range || validationEntity.length > max_range){
            validationResults.acceptable = false
            validationResults.message = `${capatilize(key)} out of range! expected range is ${min_range}-${max_range} characters`
            return validationResults
        }
    }


    return validationResults
}


const validateData = ({data, requiredAllFields, moduleProperty, moduleFields}) => {
    let results = {acceptable : true}

    if(typeof data !== "object" 
        || data === null 
        || Array.isArray(data)){
            results.acceptable = false
            results.message = "Invalid data"
            return results
        }
    
    let data_keys = Object.keys(data)

    if(data_keys.length === 0){
        results.acceptable = false
        results.message = "No data to " + (requiredAllFields ? "add" : "update")
        return results
    }

    if(requiredAllFields){
        for(let field of moduleFields){
            if (!data_keys.includes(field)){
                results.acceptable = false
                results.message = `${capatilize(field)} is required`
                return results
            }
        }
    } 

    for (let key of data_keys){
        if(!moduleFields.includes(key)){
            results.acceptable = false
            results.message = `Invalid field ${key}`
            return results
        }

        let validationResult = validateProperties(
            data, 
            key, 
            moduleProperty[key].datatype,
            moduleProperty[key].minrange,
            moduleProperty[key].maxrange
        )

        if(!validationResult.acceptable)
            return validationResult
    }

    return results
}

const validateAuthData = (user) => {
    return validateData({
        data : user,
        requiredAllFields : true,
        moduleProperty : AUTH_PROPERTY_CONFIGS,
        moduleFields : AUTH_FIELDS
    })
}

const validateTaskData = (task, isPostReq = true) => {
        return validateData({
        data : task,
        requiredAllFields : isPostReq ,
        moduleProperty : TASK_PROPERTY_CONFIGS,
        moduleFields :  isPostReq ? TASK_REQUIRED_POST_FIELDS : TASK_FEILDS
    })
}

export {
    validateAuthData,
    validateTaskData
}