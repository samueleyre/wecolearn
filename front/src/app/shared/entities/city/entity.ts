export class City {
  id: number;
  latitude: number;
  longitude: number;
  name: string;


  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.latitude = obj && obj.latitude || null;
    this.longitude = obj && obj.longitude || null;
    this.name = obj && obj.name || null;
  }
}
