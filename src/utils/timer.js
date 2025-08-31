class Timer {
  currJobId;
  updateListeners = [];
  audio = new Audio("/clock-tic.wav");
  isSoundEnabled = false;

  constructor(timerPreferences) {
    this.work = timerPreferences.work || 25;
    this.break = timerPreferences.break || 5;
    this.sessions = timerPreferences.sessions || 5;
    this.longBreakOnSessions = timerPreferences.longBreakOnSessions || 2;
    this.longBreakDuration = timerPreferences.longBreakDuration || 15;
    this.label = timerPreferences.label || "Unlabelled";
    this.completedSessions = timerPreferences.completedSessions || 0;
    this.completedBreaks = timerPreferences.completedBreaks || 0;
    this.completedLongBreaks = timerPreferences.completedLongBreaks || 0;
    this.onGoingTimerStateInSeconds =
      timerPreferences.onGoingTimerStateInSeconds || 0;
    this.isAborted = timerPreferences.isAborted || false;
  }

  getSerializedTimer() {
    return {
      work: this.work,
      break: this.break,
      sessions: this.sessions,
      longBreakOnSessions: this.longBreakOnSessions,
      longBreakDuration: this.longBreakDuration,
      label: this.label,
      completedSessions: this.completedSessions,
      completedBreaks: this.completedBreaks,
      completedLongBreaks: this.completedLongBreaks,
      onGoingTimerStateInSeconds: this.onGoingTimerStateInSeconds,
      isAborted: this.isAborted,
    };
  }

  onTimerUpdateListener(listener) {
    this.updateListeners.push(listener);
  }

  callListeners() {
    this.updateListeners.forEach((listener) => {
      listener();
    });
  }

  skipSession() {
    this.onGoingTimerStateInSeconds = this.getCurrentJobDurationInSeconds();
    if (!this.isRunning()) {
      this.start();
    }
  }

  setSoundEnabled(value) {
    this.isSoundEnabled = value;
  }

  abort() {
    this.isAborted = true;
    this.stop();
    this.callListeners();
  }

  start() {
    if (this.currJobId || this.isAborted) return;

    this.currJobId = setInterval(() => {
      this.onGoingTimerStateInSeconds++;

      // on session complete
      if (
        this.onGoingTimerStateInSeconds >= this.getCurrentJobDurationInSeconds()
      ) {
        this.onGoingTimerStateInSeconds = 0;

        if (this.isFocusTime()) {
          this.completedSessions++;
        } else if (this.isLongBreak()) {
          this.completedLongBreaks++;
        } else {
          this.completedBreaks++;
        }
      }

      // is timer completed
      if (this.isCompleted()) {
        clearInterval(this.currJobId);
        this.currJobId = null;
      }

      this.callListeners();

      // Play sound
      if (
        this.isSoundEnabled &&
        this.getCurrentSessionTimeLeftInSeconds() < 10
      ) {
        this.audio.play();
      }
    }, 1000);

    this.callListeners();
  }

  stop() {
    if (!this.currJobId) return;
    clearInterval(this.currJobId);
    this.currJobId = null;
    this.callListeners();
  }

  isRunning() {
    return Boolean(this.currJobId);
  }

  getCurrentSessionTimeLeftInSeconds() {
    return Math.max(
      0,
      this.getCurrentJobDurationInSeconds() - this.onGoingTimerStateInSeconds
    );
  }

  getCurrentJobDurationInSeconds() {
    // curr job duration
    let currJobDuration;
    if (this.isFocusTime()) {
      currJobDuration = this.work;
    } else if (this.isLongBreak()) {
      currJobDuration = this.longBreakDuration;
    } else {
      currJobDuration = this.break;
    }

    return currJobDuration * 60;
  }

  isCompleted() {
    return this.sessions === this.completedSessions;
  }

  isFocusTime() {
    return (
      this.completedSessions <= this.completedBreaks + this.completedLongBreaks
    );
  }

  isLongBreak() {
    return this.completedSessions % this.longBreakOnSessions === 0;
  }

  formattedTimerState() {
    if (this.isAborted) return "Aborted";
    if (this.isCompleted()) return "Completed";

    if (this.isFocusTime()) {
      return `Session ${this.completedSessions + 1}/${this.sessions}`;
    }

    // long break
    if (this.isLongBreak()) {
      return `Long Break`;
    }

    // Break
    return `Break`;
  }
}

export default Timer;
