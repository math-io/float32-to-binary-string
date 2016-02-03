'use strict';

// MODULES //

var tape = require( 'tape' );
var repeat = require( 'utils-repeat-string' );
var rpad = require( 'utils-right-pad-string' );
var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var bits = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/bits_1e-36_1e-38.json' );
var medium = require( './fixtures/bits_-1e3_1e3.json' );
var large = require( './fixtures/bits_1e36_1e38.json' );
var subnormal = require( './fixtures/bits_1e-39_1e-45.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof bits === 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `+0`, the function returns a string of all zeros', function test( t ) {
	var expected = repeat( '0', 32 );
	t.equal( bits( 0 ), expected, 'returns all 0s' );
	t.end();
});

tape( 'if provided `-0`, the function returns a string of all zeros except for the sign bit', function test( t ) {
	var expected = rpad( '1', 32, '0' );
	t.equal( bits( -0 ), expected, 'returns all 0s except the sign bit' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns a string where all exponent bits are 1s and everything else are 0s', function test( t ) {
	var expected;

	expected = '0';
	expected += repeat( '1', 8 );
	expected += repeat( '0', 23 );

	t.equal( bits( pinf ), expected, 'returns bit string for +infinity' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns a string where the sign bit is 1, all exponent bits are 1s, and everything else are 0s', function test( t ) {
	var expected;

	expected = '1';
	expected += repeat( '1', 8 );
	expected += repeat( '0', 23 );

	t.equal( bits( ninf ), expected, 'returns bit string for -infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns a string where the sign bit may be either 1 or 0, all exponent bits are 1s, and the fraction cannot be all 0s', function test( t ) {
	var actual;
	var frac;
	var exp;

	exp = repeat( '1', 8 );
	frac = repeat( '0', 23 );

	actual = bits( NaN );

	t.ok( actual[0] === '0' || actual[1] === '1', 'sign bit is either 1 or 0' );
	t.equal( actual.substring( 1, 9 ), exp, 'all 1s for exponent' );
	t.notEqual( actual.substring( 9 ), frac, 'fraction does not equal all 0s' );
	t.end();
});

tape( 'the function returns literal bit representations for small values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = bits( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for medium values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = bits( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for large values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = bits( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for subnormal values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = bits( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});
