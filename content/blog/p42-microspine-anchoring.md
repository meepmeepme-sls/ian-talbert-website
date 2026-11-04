---
title: "Anchoring Against the Unknown: Tendon Differential Kinematics in the P42 Mechanism"
date: "2026-02-28"
readingTime: "9 min read"
chapter: "Treatise II"
summary: "Design notes from the Rose-Hulman Senior Capstone: building an autonomous, tendon-actuated microspine gripper array capable of securing reaction loads on fractured rock in low-gravity and subsea environments."
tags: ["Senior Capstone", "Robotics", "Mechanism Design", "Kinematics", "SolidWorks"]
---

When drilling, coring, or taking biological and mineral samples in unconstrained environments—whether deep underwater trenches or the airless surface of asteroid 16 Psyche—a robot faces an unavoidable physical constraint: Newton’s third law. The moment an oscillatory diamond cutting tooth bites into basalt or dense limestone, an equal and opposite reaction force pushes the vehicle away from the substrate. In microgravity or neutral buoyancy, a standard rover simply floats away or tumbles uncontrollably.

To solve this reaction-force dilemma in the **P42 Sample Acquisition Capstone**, our team developed an anchoring architecture inspired by the Jet Propulsion Laboratory’s (JPL) planetary microspine research. Rather than relying on massive clamping forces or chemical adhesives, a microspine array utilizes hundreds of miniature, hardened steel fishhooks mounted on independent compliant four-bar linkages. When dragged in shear along a rough rock face, the hooks catch on microscopic asperities—peaks and valleys on the order of tens of micrometers—and mechanically lock into the rock face.

### The Problem of Load Sharing: Why Rigid Clamps Fail

If an array of steel spines is mounted rigidly to a flat plate, irregularities in the rock surface mean that only one or two spines make contact with high points. When reaction load is applied, those one or two spines carry 100% of the shear force, rapidly exceeding their yield strength or shearing off the rock's microscopic asperities:

$$F_{\text{spine}} = \frac{F_{\text{total}}}{N_{\text{engaged}}} \quad \text{where} \quad N_{\text{engaged}} \to 1 \text{ for rigid plates}$$

The fundamental challenge in microspine design is kinematic compliance: every individual spine must be free to deflect independently until it finds an asperity, and the applied tension must distribute evenly across all engaged spines rather than overloading the first contact point.

```
       [ Actuation Cable ]
               |
         +-----+-----+  (Primary Whiffletree)
         |           |
      +--+--+     +--+--+ (Secondary Differential)
      |     |     |     |
     [s]   [s]   [s]   [s]  (Compliant Microspine Hooks)
```

### The Closed-Loop Cable Differential (Whiffletree Kinematics)

To distribute loads across multiple spines without adding heavy motorized actuators, we engineered a multi-tier closed-loop cable differential, often called a whiffletree mechanism. 

A continuous loop of ultra-high-molecular-weight polyethylene (UHMWPE) synthetic tendon routes through low-friction Delrin and bronze pulleys mounted to adjacent spine rocker arms. When tension is applied to the primary central tendon:
1. Spines that encounter rock asperities immediately halt their travel.
2. The continuous tendon slides freely across the differential pulleys, transferring stroke to the remaining unengaged spines.
3. Every engaged spine sustains an equalized fraction of the total tension vector: $T_i \approx \frac{T_{\text{cable}}}{N}$.

By incorporating constant-force springs and surgical elastomeric tubing into the return geometry, the mechanism naturally returns to its open, ready state upon tendon release without requiring bidirectional motorized cabling.

### Interfacing the Core Cutter and Indexing Carousel

Anchoring is only half the mission. Once the tripod feet seat against the irregular terrain, the central payload must bore and store a clean cylindrical core sample without transmitting high-frequency vibration into the anchor points. 

To achieve this:
- **Oscillating Cutter Toolhead:** Rather than a high-torque rotary core drill—which generates large continuous reactionary torque vectors capable of dislodging microspines—we adapted a high-frequency oscillatory cutting head. The reciprocating cutting stroke produces near-zero net angular momentum, isolating the anchors from twisting moments.
- **In-Line Load Cell Feedback:** An axial compression load cell integrated directly behind the lead screw carriage provides real-time thrust measurement. The feed-rate controller modulates plunge velocity to maintain cutter force within a narrow 15–25 N band, preventing anchor detachment while maximizing cut rate.
- **Geneva Mechanism Storage Carousel:** Once the core sample is cut and extracted into the retrieval basket, a four-slot Geneva mechanism driven by a small stepper motor indexes the next sample vial into position. The mechanical dwell of the Geneva drive guarantees precision geometric alignment without the risk of cumulative encoder drift in harsh field conditions.

### Empirical Validation on Concrete and Basalt Simulants

To rigorously evaluate the system prior to final delivery, we formulated standardized test substrates by casting high-strength concrete blocks embedded with coarse crushed steel aggregates and varied silica grit. Testing demonstrated that the microspine differential achieved reliable anchoring under shear loads exceeding 180 N on vertical surfaces—more than triple the reaction forces generated by the oscillatory cutting toolhead during peak core extraction.
