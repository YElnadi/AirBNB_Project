checkDateIntersectExclusive = function(start1, end1, start2, end2){
    return (start1 > start2 && start1 < end2)
        || (start2 > start1 && start2 < end1);
}

console.log(checkDateIntersectExclusive(
    new Date(2022, 12, 1),
    new Date(2022, 12, 3),
    new Date(2022, 12, 5),
    new Date(2022, 12, 7)))
console.log(checkDateIntersectExclusive(
    new Date(2022, 12, 1),
    new Date(2022, 12, 3),
    new Date(2022, 12, 2),
    new Date(2022, 12, 7)))

    var obj = { first: "John", last: "Doe" };

Object.keys(obj).forEach(function(key) {
    console.log(obj[key]);
});

