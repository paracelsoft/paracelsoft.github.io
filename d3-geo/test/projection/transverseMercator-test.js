var tape = require("tape"),
    d3 = require("../../");

require("../pathEqual");

tape("transverseMercator.clipExtent(null) sets the default automatic clip extent", function(test) {
  var projection = d3.geoTransverseMercator().translate([0, 0]).scale(1).clipExtent(null).precision(0);
  test.pathEqual(d3.geoPath(projection)({type: "Sphere"}), "M3.141593,3.141593L0,3.141593L-3.141593,3.141593L-3.141593,-3.141593L-3.141593,-3.141593L0,-3.141593L3.141593,-3.141593L3.141593,3.141593Z");
  test.equal(projection.clipExtent(), null);
  test.end();
});

tape("transverseMercator.center(center) sets the correct automatic clip extent", function(test) {
  var projection = d3.geoTransverseMercator().translate([0, 0]).scale(1).center([10, 10]).precision(0);
  test.pathEqual(d3.geoPath(projection)({type: "Sphere"}), "M2.966167,3.316126L-0.175426,3.316126L-3.317018,3.316126L-3.317019,-2.967060L-3.317019,-2.967060L-0.175426,-2.967060L2.966167,-2.967060L2.966167,3.316126Z");
  test.equal(projection.clipExtent(), null);
  test.end();
});

tape("transverseMercator.clipExtent(extent) intersects the specified clip extent with the automatic clip extent", function(test) {
  var projection = d3.geoTransverseMercator().translate([0, 0]).scale(1).clipExtent([[-10, -10], [10, 10]]).precision(0);
  test.pathEqual(d3.geoPath(projection)({type: "Sphere"}), "M10,3.141593L0,3.141593L-10,3.141593L-10,-3.141593L-10,-3.141593L0,-3.141593L10,-3.141593L10,3.141593Z");
  test.deepEqual(projection.clipExtent(), [[-10, -10], [10, 10]]);
  test.end();
});

tape("transverseMercator.clipExtent(extent).scale(scale) updates the intersected clip extent", function(test) {
  var projection = d3.geoTransverseMercator().translate([0, 0]).clipExtent([[-10, -10], [10, 10]]).scale(1).precision(0);
  test.pathEqual(d3.geoPath(projection)({type: "Sphere"}), "M10,3.141593L0,3.141593L-10,3.141593L-10,-3.141593L-10,-3.141593L0,-3.141593L10,-3.141593L10,3.141593Z");
  test.deepEqual(projection.clipExtent(), [[-10, -10], [10, 10]]);
  test.end();
});

tape("transverseMercator.clipExtent(extent).translate(translate) updates the intersected clip extent", function(test) {
  var projection = d3.geoTransverseMercator().scale(1).clipExtent([[-10, -10], [10, 10]]).translate([0, 0]).precision(0);
  test.pathEqual(d3.geoPath(projection)({type: "Sphere"}), "M10,3.141593L0,3.141593L-10,3.141593L-10,-3.141593L-10,-3.141593L0,-3.141593L10,-3.141593L10,3.141593Z");
  test.deepEqual(projection.clipExtent(), [[-10, -10], [10, 10]]);
  test.end();
});

tape("transverseMercator.rotate(???) does not affect the automatic clip extent", function(test) {
  var projection = d3.geoTransverseMercator(), object = {
    type: "MultiPoint",
    coordinates: [
      [-82.35024908550241, 29.649391549778745],
      [-82.35014449996858, 29.65075946917633],
      [-82.34916073446641, 29.65070265688781],
      [-82.3492653331286, 29.64933474064504]
    ]
  };
  projection.fitExtent([[0, 0], [960, 600]], object);
  test.deepEqual(projection.scale(), 15724992.330511674);
  test.deepEqual(projection.translate(), [20418843.897824813, 21088401.790971387]);
  projection.rotate([0, 95]).fitExtent([[0, 0], [960, 600]], object);
  test.deepEqual(projection.scale(), 15724992.330511674);
  test.deepEqual(projection.translate(), [20418843.897824813, 47161426.43770847]);
  test.end();
});
