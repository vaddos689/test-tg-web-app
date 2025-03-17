declare module '@twa-dev/sdk' {
  interface WebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
  }

  interface WebAppInitData {
    query_id?: string;
    user?: WebAppUser;
    auth_date?: number;
    hash?: string;
  }

  interface WebAppMainButton {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive: boolean) => void;
    hideProgress: () => void;
  }

  interface WebApp {
    initData: string;
    initDataUnsafe: WebAppInitData;
    version: string;
    colorScheme: string;
    themeParams: {
      bg_color: string;
      text_color: string;
      hint_color: string;
      link_color: string;
      button_color: string;
      button_text_color: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    MainButton: WebAppMainButton;
    ready: () => void;
    expand: () => void;
    close: () => void;
    showAlert: (message: string) => void;
    showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
    onEvent: (eventType: string, eventHandler: () => void) => void;
    offEvent: (eventType: string, eventHandler: () => void) => void;
  }

  const WebApp: WebApp;
  export default WebApp;
} 