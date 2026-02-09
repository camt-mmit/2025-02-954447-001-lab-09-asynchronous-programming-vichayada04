import { Injectable, signal } from '@angular/core';
import { DynamicSection } from '../types';

@Injectable({ providedIn: 'root' })
export class DynamicSectionDataStorage {
  private readonly STORAGE_KEY = 'my_dynamic_data'; // ชื่อ Key ที่จะเก็บในเบราว์เซอร์
  private _data = signal<DynamicSection>([]);
  public readonly data = this._data.asReadonly();

  constructor() {
    // [Step 1] เมื่อ Service ถูกสร้าง (ตอนโหลดแอป) ให้ไปดึงข้อมูลเก่าจาก localStorage มาก่อน
    const savedRaw = localStorage.getItem(this.STORAGE_KEY);
    if (savedRaw) {
      try {
        const parsedData = JSON.parse(savedRaw);
        this._data.set(parsedData); // เอาข้อมูลเก่าที่เจอใส่กลับเข้าไปใน Signal
      } catch (e) {
        console.error('Could not parse saved data', e);
      }
    }
  }

  async get(): Promise<DynamicSection | null> {
    const currentData = this._data();
    // ถ้าไม่มีข้อมูล หรือมีแค่ค่าเริ่มต้น [[0]] ให้ส่ง null เพื่อให้หน้า View ขึ้น Not Found
    const isInitial =
      currentData.length === 1 && currentData[0].length === 1 && currentData[0][0] === 0;

    if (currentData.length === 0 || isInitial) {
      return null;
    }
    return currentData;
  }

  async save(data: DynamicSection): Promise<void> {
    const isInitial = data.length === 1 && data[0].length === 1 && data[0][0] === 0;

    if (data.length === 0 || isInitial) {
      this._data.set([]);
      localStorage.removeItem(this.STORAGE_KEY); // ลบข้อมูลในเครื่องทิ้งถ้าค่าว่าง
    } else {
      this._data.set(data);
      // [Step 2] บันทึกข้อมูลลง localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }
}
