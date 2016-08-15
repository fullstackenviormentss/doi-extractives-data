(function(exports) {

  var attached = function() {
    var root = d3.select(this);
    var self = d3.select(this);

    var select = root.selectAll('select.chart-selector');
    var maps = root.selectAll('eiti-data-map');
    var mapToggles = maps.selectAll('button[is="aria-toggle"]');
    var mapTables = root.selectAll('.eiti-data-map-table');
    var counties = maps.selectAll('.county.feature')

    var chartTables = mapTables.selectAll('table[is="bar-chart-table"]')

    var row = chartTables.selectAll('tr[data-year-values]')

    var toggleTable = function(d, i) {
      console.log(this, d, i)
      var countyName = this.querySelector('title').textContent;
      var countyFIPS = this.getAttribute('data-fips');
      console.log('county name:', countyName)
      console.log('county fips:', countyFIPS)
      mapToggles.each(function(){
        this.expand();
      });

      chartTables.each(function(){
        this.show(countyFIPS);
      })
    };

    var toggleMap = function() {
      counties.classed('selected', true)
    }

    chartTables.on('click.countyTable', toggleMap)
    counties.on('click.county', toggleTable)
  };

  var detached = function() {
  };

  exports.EITIDataMapTable = document.registerElement('eiti-data-map-table', {
    'extends': 'figure',
    prototype: Object.create(
      HTMLElement.prototype,
      {
        attachedCallback: {value: attached},
        detachdCallback: {value: detached}
      }
    )
  })

})(this);

