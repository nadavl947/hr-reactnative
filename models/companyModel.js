class Company {
    constructor(id, name, logo, defaultColor, description, departments, establishData, companyAddress, userTypes){
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.defaultColor = defaultColor;
        this.description = description;
        this.departments = departments;
        this.establishData = establishData;
        this.companyAddress = companyAddress;
        this.userTypes = userTypes;
    }
}

export default Company;