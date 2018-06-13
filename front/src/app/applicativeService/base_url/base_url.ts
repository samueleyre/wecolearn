

export function getBaseLocation() {
    this.loggerService.log(location);
    let path: string = location.origin;
    return path;
}
