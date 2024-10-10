const fragmentShader = `
varying float vDisplacement;

void main() {
    vec3 outerColor = vec3(0.4); // Darker gray
    vec3 innerColor = vec3(0.1); // Even darker gray

    // Using vDisplacement to adjust color
    float displacementFactor = smoothstep(0.0, 1.0, vDisplacement); // Normalize displacement

    // Blend colors based on the displacement factor
    vec3 color = mix(outerColor, innerColor, displacementFactor); // Transition from dark gray to darker gray

    // Adjust transparency
    gl_FragColor = vec4(color, 0.6); // Set alpha to 0.7 for more transparency
}
`;

export default fragmentShader;
