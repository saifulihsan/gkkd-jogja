jun.renderPeChartType = function(a, b, c) {
    var d = jun.rztPeChartTypes, e = d.find("id", a), c = d.getAt(e);
    return c.data.name;
};

var renderPeChartMaster = function(a, b, c) {
    var d = jun.rztPeChartMaster, e = d.find("account_code", a), c = d.getAt(e);
    return c.data.account_name;
};