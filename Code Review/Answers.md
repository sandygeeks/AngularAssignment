# Review following code snippet and answer questions:

```
@Component({
selector: 'app-user-panel',
template: `<div class="user-panel">{{ getUserName() }}</button>`,
})
export class UserPanelComponent {
    private _user;
    constructor(
    private _authService: AuthService,
    ) {
        this._authService
        .user
        .subscribe(user => {
        this._user = user;
    });
    }
    public getUserName() {
        return this._user.name;
    }
}
```

# My Review

1. Using function call in the template is a bad move since for every change detection, angular compiler has to reevaluate the getUserName().
Using Angular Pipes is better.
Angular knows that execution of a pipe can be skipped safely if the pipe’s input does not change.