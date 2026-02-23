# Expo (React Native) Web + App Deployment Guide

이 프로젝트는 하나의 코드베이스로 `Web + iOS + Android`를 함께 운영하도록 구성되어 있습니다.

## 1) 로컬 실행

- 모바일 개발 서버: `npm run start`
- Android 실행: `npm run android`
- iOS 실행: `npm run ios`
- 웹 실행: `npm run web`

## 2) 사전 설정

### Firebase

1. Firebase 프로젝트 생성
2. `.firebaserc`의 `YOUR_FIREBASE_PROJECT_ID`를 실제 프로젝트 ID로 변경
3. Firebase 로그인

```bash
npx firebase-tools login
```

### Expo / EAS

1. Expo 로그인

```bash
npx eas-cli login
```

2. `app.json`에 실제 앱 식별자 설정
- iOS: `expo.ios.bundleIdentifier` (예: `com.yourname.write`)
- Android: `expo.android.package` (예: `com.yourname.write`)

## 3) 웹 배포 (Firebase Hosting)

웹 정적 빌드:

```bash
npm run build:web
```

Firebase Hosting 배포:

```bash
npm run deploy:web
```

프리뷰 채널 배포:

```bash
npm run deploy:web:preview
```

## 4) 앱 배포 (EAS Build)

Android 프로덕션 빌드:

```bash
npm run eas:build:android
```

iOS 프로덕션 빌드:

```bash
npm run eas:build:ios
```

필요하면 빌드 완료 후 EAS Submit으로 스토어 제출을 연결하세요.

## 5) 추가 메모

- 웹 배포 결과물은 `dist/` 디렉터리입니다.
- 네이티브 전용 기능(카메라/푸시 등)은 웹에서 분기 처리가 필요할 수 있습니다.
