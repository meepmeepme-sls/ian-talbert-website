---
title: "The Art of the 12-Pound Sprint: Aggressive Pocketing and Half-Cut Drives at VEX Worlds"
date: "2026-01-20"
readingTime: "6 min read"
chapter: "Treatise III"
summary: "How shaving four pounds off a 2022 VRC Worlds competition chassis redefined match tempo, sprint kinematics, and the limits of sheet-metal rigidity."
tags: ["VEX Robotics", "Fabrication", "Weight Optimization", "Chassis Design", "VRC"]
---

In the 2021–2022 VEX Robotics Competition season (*Tipping Point*), the first fifteen seconds of autonomous match play were frequently decided within forty feet of travel. In the center of the 12x12-foot foam field stood neutral mobile goals. The robot that arrived at the center goal first, locked onto it with pneumatic clamping forks, and reversed backward won autonomous bonus points and dictated the entire pace of the match.

Most competitive teams arrived at the World Championship in Dallas with 16-to-18-pound robots powered by four- or six-motor drivetrains geared between 280 and 360 RPM. At those weights, acceleration was sluggish, and wheel slip during direction reversals robbed valuable fractions of a second.

Our design objective for robot 42700B was radical: achieve an unprecedented power-to-weight ratio by fielding a full-capability competition machine weighing just 12.0 pounds—making it the fastest robot to the middle of the field at Worlds.

### Half-Cut Drivetrain Architecture

In standard VRC construction, drivetrains are assembled using full-width aluminum C-channels ($1\times2\times1\times35$ or $1\times3\times1\times35$ hole sections). While structurally rigid, the internal flanges represent parasitic mass located far away from the primary load paths.

```
Standard C-Channel:             Half-Cut "L" Section:
      +-------+                      +-------+
      |       |                      |       |
      |   O   |                      |   O   |
      |       |                      |       |
      +---+---+                      +-------+
          |                              |
          |                              | (Milled or Sheared Flange)
      +---+---+
      |   O   |
      +-------+
```

To eliminate this surplus weight:
1. **Half-Cut Geometry:** Every structural channel was precision band-sawed and milled down its centerline, converting heavy C-channels into lightweight L-angles and flat plates wherever torsional loads permitted.
2. **Bearing Flat Relieving:** Standard acetal bearing flats were trimmed down to bare circular hubs around the hex-shaft bore, retaining shaft alignment while stripping dozens of grams across eight support points.
3. **Pneumatic Reservoir Integration:** By utilizing short-stroke 10mm-bore pneumatic cylinders and trimming air tubing to exact millimeter runs, our pneumatic manifold weighed under 220 grams while supplying twelve full-pressure clamping actuations.

### Kinetic Energy and Traction Dynamics

Cutting mass from 16.5 lb to 12.0 lb yields a dramatic 27% mass reduction. Since $F = m a$, for identical motor torque $T$ applied through identical 3.25-inch Omni wheels, acceleration increases in direct inverse proportion to mass:

$$a_{\text{12lb}} = \frac{F_{\text{drive}}}{m_{\text{12lb}}} \approx 1.37 \cdot a_{\text{16.5lb}}$$

This 37% gain in translational acceleration allowed our robot to hit top speed within two wheel rotations. In tournament play, 42700B consistently reached the center goal in under 0.85 seconds—beating opposing machines by nearly half a robot length.

### Structural Tradeoffs: Deflection Under Shock

The danger of extreme lightweighting is chassis deflection. When a 12-pound machine colliding at full speed strikes an opposing robot or arena perimeter wall, thin structural flanges can buckle. 

To maintain structural integrity without adding steel gussets, we employed:
- **Tensioned Cross-Bracing:** Instead of heavy aluminum plates, 1/16-inch high-tensile steel wire was tensioned diagonally across the chassis belly-pan in an X-pattern. Steel wire offers an extraordinary tensile modulus per gram, resisting parallelogram shear racking under heavy side collisions while adding less than 15 grams of total weight.
- **Strategic Standoff Stacking:** Standoff spacers were threaded together with high-strength alloy steel set screws and torqued into closed triangulated space-frames, forming rigid torque boxes directly around the cantilevered drive shafts.

The resulting machine demonstrated that extreme mechanical discipline and purposeful mass elimination can overcome raw motor count, turning kinematics and acceleration into an insurmountable tactical advantage.
