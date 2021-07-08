Angelo

```
v1#asTree x 1,230 ops/sec ±1.12% (91 runs sampled)
v2#asTree x 105,195 ops/sec ±0.93% (92 runs sampled)
Fastest is v2#asTree

v1#asText x 1,504,047 ops/sec ±0.20% (95 runs sampled)
v2#asText x 4,024,553 ops/sec ±0.26% (96 runs sampled)
Fastest is v2#asText

v1#serialize x 1,270 ops/sec ±0.49% (91 runs sampled)
v2#serialize x 50,942 ops/sec ±0.77% (90 runs sampled)
Fastest is v2#serialize
```

Lucie (after type rework), safe to say Windows is slower

```
v1#asTree x 986 ops/sec ±2.19% (81 runs sampled)
v2#asTree x 84,064 ops/sec ±1.59% (85 runs sampled)
Fastest is v2#asTree

v1#asText x 1,139,553 ops/sec ±1.30% (86 runs sampled)
v2#asText x 3,017,046 ops/sec ±2.31% (80 runs sampled)
Fastest is v2#asText

v1#serialize x 996 ops/sec ±1.99% (85 runs sampled)
v2#serialize x 39,182 ops/sec ±2.16% (83 runs sampled)
Fastest is v2#serialize
```

Lucie `Array.prototype.forEach` + `in`

```
v1#asTree x 977 ops/sec ±2.83% (81 runs sampled)
v2#asTree x 86,115 ops/sec ±1.92% (85 runs sampled)
Fastest is v2#asTree

v1#asText x 1,098,432 ops/sec ±2.57% (84 runs sampled)
v2#asText x 3,068,639 ops/sec ±2.04% (82 runs sampled)
Fastest is v2#asText

v1#serialize x 1,012 ops/sec ±2.10% (84 runs sampled)
v2#serialize x 38,570 ops/sec ±2.76% (82 runs sampled)
Fastest is v2#serialize
```

Lucie `Array.prototype.forEach`

```
v1#asTree x 982 ops/sec ±2.95% (81 runs sampled)
v2#asTree x 85,533 ops/sec ±2.19% (84 runs sampled)
Fastest is v2#asTree

v1#asText x 1,109,539 ops/sec ±2.21% (86 runs sampled)
v2#asText x 3,000,435 ops/sec ±2.69% (79 runs sampled)
Fastest is v2#asText

v1#serialize x 1,016 ops/sec ±2.26% (81 runs sampled)
v2#serialize x 38,241 ops/sec ±3.41% (79 runs sampled)
Fastest is v2#serialize
```

Lucie `Array.prototype.forEach` + `Array.prototype.join`

```
v1#asTree x 976 ops/sec ±3.08% (81 runs sampled)
v2#asTree x 83,984 ops/sec ±2.40% (82 runs sampled)
Fastest is v2#asTree

v1#asText x 1,121,033 ops/sec ±2.57% (84 runs sampled)
v2#asText x 889,235 ops/sec ±2.28% (85 runs sampled)
Fastest is v1#asText

v1#serialize x 1,007 ops/sec ±3.38% (84 runs sampled)
v2#serialize x 40,508 ops/sec ±2.09% (87 runs sampled)
Fastest is v2#serialize
```

Lucie `for` loop

```
v1#asTree x 942 ops/sec ±3.09% (78 runs sampled)
v2#asTree x 86,048 ops/sec ±2.00% (84 runs sampled)
Fastest is v2#asTree

v1#asText x 1,090,755 ops/sec ±2.64% (82 runs sampled)
v2#asText x 3,570,875 ops/sec ±2.26% (84 runs sampled)
Fastest is v2#asText

v1#serialize x 1,007 ops/sec ±2.40% (84 runs sampled)
v2#serialize x 35,835 ops/sec ±4.83% (76 runs sampled)
Fastest is v2#serialize
```
