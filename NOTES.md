## Props
**Definition**: Props (short for properties) are read-only attributes passed from a parent component to a child component.
**Purpose**: They are used to pass data and event handlers doen the component tree.
**Mutability**: Immutable. Once set, they cannot be changed by the child component.
**Usage**: Ideal for passing static or dynamic data that doesn't need to be modified by the child component.

Props are passed to the child within the render method of the parent as the second argument to **React.createElement()** or, if you're using JSX, the more familiar tag attributes.

## State
**Definition**: State is a built-in object that allows components to create and manage their own data.
**Purpose**: Used to store data that can change over time and affect the component's rendering.
**Mutability**: Mutable. Can be updated using the setState function (in class components) or the useState hook (in functional components).
**Usage**: Ideal for managing dynamic data that needs to be tracked and updated within the component.

## Key Differences
**Data Flow**: Props are passed from parent to child, while state is managed within the component.
**Mutability**: Props are immutable, whereas state is mutable.
**Purpose**: Props are for passing data and functions, state is for managing component-specific data.

