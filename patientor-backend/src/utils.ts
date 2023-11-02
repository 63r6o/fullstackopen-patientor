import {
    Gender,
    NewEntry,
    NewBaseEntry,
    NewPatient,
    Diagnosis,
    Discharge,
    HealthCheckRating,
} from "./types";

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Incorrect or missing name");
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }

    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }

    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date of birth");
    }

    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }

    return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (
        "name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object
    ) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
        };

        return newEntry;
    }

    throw new Error("Incorrect data: some fields are missing");
};

const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
        throw new Error("Incorrect or missing description");
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
        throw new Error("Incorrect or missing name");
    }

    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
    if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis["code"]>;
    }

    return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)) {
        throw new Error("Incorrect or missing occupation");
    }

    return criteria;
};

const parseDischargeDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing discharge date");
    }

    return date;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("date" in object && "criteria" in object) {
        const newDiscarge = {
            date: parseDischargeDate(object.date),
            criteria: parseCriteria(object.criteria),
        };

        return newDiscarge;
    }

    throw new Error("Incorrect data: some fields are missing");
};

const toNewHospital = (object: NewBaseEntry): NewEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("discharge" in object) {
        const newHospitalEntry = {
            ...object,
            type: "Hospital" as "Hospital",
            discharge: parseDischarge(object.discharge),
        };

        return newHospitalEntry;
    }

    throw new Error("Incorrect data: some fields are missing");
};

const isNumber = (num: unknown): num is number => {
    return !isNaN(Number(num));
};

const isHealthCheckRating = (param: number) => {
    return Object.values(HealthCheckRating)
        .map((v) => Number(v))
        .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error("Incorrect or missing rating");
    }

    return rating;
};

const toNewHealth = (object: NewBaseEntry): NewEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("healthCheckRating" in object) {
        const newHealthCheckEntry = {
            ...object,
            type: "HealthCheck" as "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };

        return newHealthCheckEntry;
    }

    throw new Error("Incorrect data: some fields are missing");
};

const parseEmployerName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Incorrect or missing name");
    }

    return name;
};

const parseSickStartDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing sick leave start date");
    }

    return date;
};

const parseSickEndDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing sick leave end date");
    }

    return date;
};

const parseSickLeave = (object: unknown) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("startDate" in object && "endDate" in object) {
        const newSickLeave = {
            startDate: parseSickStartDate(object.startDate),
            endDate: parseSickEndDate(object.endDate),
        };

        return newSickLeave;
    }

    throw new Error("Incorrect data: some fields are missing");
};

const toNewOccupational = (object: NewBaseEntry): NewEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("employerName" in object) {
        const newHealthCheckEntry = {
            ...object,
            type: "OccupationalHealthcare" as "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            sickLeave:
                "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
        };

        return newHealthCheckEntry;
    }

    throw new Error("Incorrect data: some fields are missing");
};

const parseEntryDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing entry date");
    }

    return date;
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object
    ) {
        const entryObject: NewBaseEntry = {
            ...object,
            description: parseDescription(object.description),
            date: parseEntryDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes:
                "diagnosisCodes" in object
                    ? parseDiagnosisCodes(object.diagnosisCodes)
                    : undefined,
        };

        switch (object.type) {
            case "Hospital":
                return toNewHospital(entryObject);
            case "HealthCheck":
                return toNewHealth(entryObject);
            case "OccupationalHealthcare":
                return toNewOccupational(entryObject);
            default:
                throw new Error("Unknown type");
        }
    }

    throw new Error("Incorrect data: some fields are missing");
};
