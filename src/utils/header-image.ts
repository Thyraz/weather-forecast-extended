import type { HassEntity } from "home-assistant-js-websocket";

export class HeaderImageLoader {
  private _entityId?: string;
  private _requestedUrl?: string;
  private _image?: HTMLImageElement;
  private _onChange: (url: string | undefined) => void;

  constructor(onChange: (url: string | undefined) => void) {
    this._onChange = onChange;
  }

  update(entity: HassEntity | undefined, hassUrl: (path: string) => string): void {
    const token = entity?.attributes.access_token;
    if (
      !entity?.entity_id.startsWith("image.") ||
      entity.state === "unknown" ||
      entity.state === "unavailable" ||
      typeof token !== "string" ||
      !token
    ) {
      this.clear();
      return;
    }

    if (entity.entity_id !== this._entityId) {
      this.clear();
      this._entityId = entity.entity_id;
    }

    // Match HA's image proxy URL, including the state to refresh changed images.
    const query = new URLSearchParams({ token, state: entity.state });
    const url = hassUrl(`/api/image_proxy/${entity.entity_id}?${query}`);
    if (url === this._requestedUrl) {
      return;
    }

    this._cancelLoad();
    this._requestedUrl = url;
    const image = new Image();
    this._image = image;
    image.onload = () => {
      if (this._image !== image) return;
      this._cancelLoad();
      this._onChange(url);
    };
    image.onerror = () => {
      if (this._image !== image) return;
      this._cancelLoad();
      this._onChange(undefined);
    };
    image.src = url;
  }

  clear(): void {
    this._cancelLoad();
    this._entityId = undefined;
    this._requestedUrl = undefined;
    this._onChange(undefined);
  }

  private _cancelLoad(): void {
    if (this._image) {
      this._image.onload = null;
      this._image.onerror = null;
      this._image = undefined;
    }
  }
}
