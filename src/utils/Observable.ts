export type Observer<IState> = (data: IState) => void;

export default class Observable<IState> {
  private _observers: Observer<IState>[] = [];

  subscribe(observer: Observer<IState>) {
    this._observers.push(observer);
    return observer;
  }

  unsubscribe(observer: Observer<IState>) {
    this._observers = this._observers.filter((ob) => ob !== observer);
  }

  notify(data: IState) {
    this._observers.forEach((observer) => observer(data));
  }
}
