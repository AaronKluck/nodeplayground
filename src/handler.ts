import { ISender } from "./sender";

export interface IHandler {
    Execute(params : { [key: string]: string }, output : ISender): void
}

export class RootHandler {
    Execute(params : { [key: string]: string }, output : ISender): void {

    }
}

export class FooHandler {
    Execute(params : { [key: string]: string }, output : ISender): void {

    }
}

export class BarHandler {
    Execute(params : { [key: string]: string }, output : ISender): void {

    }
}