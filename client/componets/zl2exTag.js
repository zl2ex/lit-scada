






export class zl2exTag
{
    constructor(name, initVal)
    {
        if(initVal) this.value = initVal;
        else this.value = {value: false, fault: false};
        this.name = name;
        this.opcPath = "OPC[1].h1";
    }
}