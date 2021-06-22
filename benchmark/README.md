Angelo:

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
