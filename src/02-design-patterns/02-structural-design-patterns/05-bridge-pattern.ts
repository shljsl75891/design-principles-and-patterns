/**
 * Bridge Pattern
 *
 * Decouples an abstraction from its implementation so both can vary
 * independently. Instead of connecting every abstraction subclass to every
 * implementation subclass via inheritance, the abstraction holds a reference
 * to an implementation interface and delegates to it — eliminating the M×N
 * combinatorial explosion.
 *
 * Use when: you have two orthogonal dimensions of variation (e.g., remote
 * types × device types), subclassing every combination would be impractical,
 * or you need to switch implementations at runtime without changing the
 * abstraction.
 */

interface IDevice {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class TV implements IDevice {
  private enabled = false;
  private volume = 10;
  private channel = 1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

/**
 * --------- NON COMPLIANT CODE ---------
 * Each remote type must extend a specific TV class, creating a class for
 * every combination. Two remotes × two TV types = four classes. Adding a
 * third remote or third TV type forces new classes for every existing
 * counterpart — the M×N explosion.
 */
class SonyTVForBasicRemote extends TV {
  togglePower(): void {
    if (this.isEnabled()) this.disable();
    else this.enable();
  }

  volumeUp(): void {
    this.setVolume(this.getVolume() + 1);
  }

  volumeDown(): void {
    this.setVolume(this.getVolume() - 1);
  }

  showStatus(): string {
    return `Sony TV | ${this.isEnabled() ? "ON" : "OFF"} | Vol: ${this.getVolume()} | Ch: ${this.getChannel()}`;
  }
}

class SamsungTVForBasicRemote extends TV {
  togglePower(): void {
    if (this.isEnabled()) this.disable();
    else this.enable();
  }

  volumeUp(): void {
    this.setVolume(this.getVolume() + 1);
  }

  volumeDown(): void {
    this.setVolume(this.getVolume() - 1);
  }

  showStatus(): string {
    return `Samsung TV | ${this.isEnabled() ? "ON" : "OFF"} | Vol: ${this.getVolume()} | Ch: ${this.getChannel()}`;
  }
}

class SonyTVForAdvancedRemote extends SonyTVForBasicRemote {
  mute(): void {
    this.setVolume(0);
  }
}

class SamsungTVForAdvancedRemote extends SamsungTVForBasicRemote {
  mute(): void {
    this.setVolume(0);
  }
}

/**
 * --------- COMPLIANT CODE ------------
 * The remote (abstraction) holds a reference to IDevice (implementation)
 * and delegates operations to it. AdvancedRemoteControl extends the base
 * remote without knowing which device it controls. Adding a new remote type
 * or device requires only one new class — no combinatorial explosion.
 */
class RemoteControl {
  constructor(protected device: IDevice) {}

  togglePower(): void {
    if (this.device.isEnabled()) this.device.disable();
    else this.device.enable();
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 1);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 1);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  showStatus(): string {
    const brand = this.device.constructor.name;
    const power = this.device.isEnabled() ? "ON" : "OFF";
    return `${brand} | ${power} | Vol: ${this.device.getVolume()} | Ch: ${this.device.getChannel()}`;
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
  }
}

class Radio implements IDevice {
  private enabled = false;
  private volume = 5;
  private channel = 88;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

/* --------- Client Code --------- */
// Non-compliant — each TV needs its own remote class
const nonCompliantSony = new SonyTVForAdvancedRemote();
nonCompliantSony.togglePower();
nonCompliantSony.mute();
console.log(nonCompliantSony.showStatus());

// Compliant — same remote controls any device
const tv = new TV();
const basicRemote = new RemoteControl(tv);
basicRemote.togglePower();
basicRemote.volumeUp();
console.log(basicRemote.showStatus());

const advancedRemote = new AdvancedRemoteControl(tv);
advancedRemote.mute();
advancedRemote.channelUp();
console.log(advancedRemote.showStatus());

// Adding a new device works with existing remotes — no new remote classes needed
const radio = new Radio();
const radioRemote = new AdvancedRemoteControl(radio);
radioRemote.togglePower();
radioRemote.volumeUp();
radioRemote.channelUp();
console.log(radioRemote.showStatus());
