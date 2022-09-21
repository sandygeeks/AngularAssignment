# Component Interaction

Imagine that we have two components - ComponentA and ComponentB. Both
components have to interact with each other in some way:
- Send some data from ComponentA to ComponentB and vice versa.
- Call some methods from ComponentA to ComponentB and vice versa.

Given this information, please answer following questions:
1. What options do we have to establish such communication?

Answer:

a. For sending data from one component to another, we have nested components.
    One component can be nested into another by using its selector as a custom Html tag into another component and combining this with @Input Decorator.
    To call methods from a nested component to parent component, we can use event emitter using @Output Decorator.

    e.g.
    @Component({
    selector: 'app-nested-component',
    template: `This is a nested comonent``
    })
    export class NestedComponent { 

        @Input('value-to-be-passed-by-parent') passTrue : boolean;

        @Output messageEvent: EventEmitter = new EventEmitter<string>();
        
        ngOnInit(){
            this.messageEvent.emit("Hello");
        }
    }


    @Component({
        selector: 'app-parent-component',
        template : `<app-nested-component [value-to-be-passed-by-parent]="true"
                                        (messageEvent)="displayMessage($event)"
                    > </app-nested-component>`
    })
    export class ParentComponent{
        displayMessage(message){
            console.info(message);
        }
    }

b. ViewChild can be used to access the properties and methods of child from a parent component.

c. Unrelated service can be used for components to share data as long as both components have same provider for the service.

<br>
<br>
<br>
<br>
<br>

2. For each option describe what are the pros and cons of this solution?


a. @Input and @Output directive in my opinion is the most cleanest and understandable way to do it. However, it has always been dificult to find references of the components while using selector, specially in huge projects.

b. ViewChild is the one I've used very least. Accessing the methods and property is easiest in this options. It has some dependency on AfterViewInit Life Cycle Hook.
Accessing same components multiple times in a parent component introduces complexity.

c. Using Services and Dependency Injection (DI) make code more readable and easy to reuse.
However, most javascript developers dont ave experience in DI

<br>
<br>
<br>
<br>
<br>


3) For each option describe what are the cases the solution fits best?

a. Nested Component

When one component is clearly a part of another bigger component, then nesting is the best way to use. 
The smaller part can sometimes be reused in multiple pages.

    e.g. Purchase vs Sales Doughnut Report which can be shown in Dashboard as well as other reports in an Inventory Management Application.

b. ViewChild

ViewChild can be used to inject into a component class references to elements used inside its template. This can be another component, directives or plain DOM Element.



c. Services

The best use of Service is to centralise the logic into one place and reuse it for another components. Duplication and Redundancy is reduced.