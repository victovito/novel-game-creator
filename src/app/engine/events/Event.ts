export default class Event<T> {
    private subscribers: ((data: T) => void)[] = [];

    constructor() {}

    subscribe(callback: (data: T) => void) {
        this.subscribers.push(callback);
    }

    emit(data: T) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}