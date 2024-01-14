export default class TimerClass {
  private duration: number;
  private update: () => void;
  private intervalId: NodeJS.Timeout | null;
  private startTime: number;
  private isRunning: boolean;

  constructor(duration: number, update: () => void) {
    this.duration = duration;
    this.update = update;
    this.intervalId = null;
    this.startTime = 0;
    this.isRunning = false;
  }

  public start = ():void =>  {
    if (!this.isRunning) {
      
      this.startTime = Date.now();
      this.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = this.duration - elapsedTime / 1000;

        this.update();

        if (remainingTime <= 0) {
          this.reset();
        }
        
      }, 200);

      this.isRunning = true;
      this.update();
    }
  }

  public reset = (): void => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
    }
    this.update();
  }

  public getRemainingTime = (): number  =>{
    if (this.isRunning) {
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = this.duration - elapsedTime / 1000;
      return Math.max(remainingTime, 0);
    } else {
      return this.duration;
    }
  }

  public isTimerRunning = (): boolean => {
    return this.isRunning;
  }
}