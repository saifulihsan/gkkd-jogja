jun.renderPahChartType = function(a, b, c) {
    var d = jun.rztPahChartTypes, e = d.find("id", a), c = d.getAt(e);
    return c.data.name;
};

var renderPahChartMaster = function(a, b, c) {
    var d = jun.rztPahChartMaster, e = d.find("account_code", a), c = d.getAt(e);
    return c.data.account_name;
};