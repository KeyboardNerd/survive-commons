// this is a playground!
var method = Foo.prototype;

function Foo(bar){
    this.bar = bar;
}

method.test = function(){
    console.log('hello world');
};
method.testthings = function(a,b,c){
    console.log(a + b + c);
};
module.exports = Foo;
