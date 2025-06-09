# React + Vite + Tailwind CSS 프로젝트 설정 가이드

## AI 어시스턴트에게 요청할 때 사용할 프롬프트

```
안녕하세요! React + Vite + Tailwind CSS 프로젝트를 설정해주세요. 
다음 사항들을 확인하고 필요한 파일들을 생성/수정해주세요:

### 1. 기본 프로젝트 구조 확인
- [ ] package.json에 scripts 섹션이 있는지 확인 (dev, build, preview)
- [ ] index.html 파일 존재 여부
- [ ] src/main.tsx 파일 존재 여부
- [ ] vite.config.ts 파일 존재 여부

### 2. 의존성 패키지 설치
다음 패키지들이 설치되어 있는지 확인하고 없으면 설치해주세요:
- React 관련: react, react-dom, @types/react, @types/react-dom
- Vite 관련: vite, @vitejs/plugin-react
- Tailwind CSS 관련: tailwindcss@^3.4.0, postcss, autoprefixer
- UI 컴포넌트에서 사용하는 패키지들:
  - @radix-ui/react-* (필요한 컴포넌트들)
  - class-variance-authority
  - lucide-react
  - clsx, tailwind-merge

### 3. 설정 파일들
- [ ] tailwind.config.js - Tailwind CSS 3.x 형식으로
- [ ] postcss.config.js - tailwindcss 플러그인 포함
- [ ] vite.config.ts - React 플러그인 포함

### 4. CSS 파일 확인
- [ ] styles/globals.css에 다음이 포함되어 있는지:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- [ ] CSS 변수들이 올바른 형식인지 (HSL 값)

### 5. Import 문 검증
UI 컴포넌트 파일들에서 다음과 같은 잘못된 import가 있는지 확인:
- ❌ `from "@radix-ui/react-slot@1.1.2"`
- ❌ `from "class-variance-authority@0.7.1"`
- ❌ `from "lucide-react@0.487.0"`

올바른 형식으로 수정:
- ✅ `from "@radix-ui/react-slot"`
- ✅ `from "class-variance-authority"`
- ✅ `from "lucide-react"`

### 6. 문제 해결 순서
1. package.json 스크립트 추가
2. 기본 파일 구조 생성 (index.html, src/main.tsx, vite.config.ts)
3. 의존성 설치
4. Import 문 수정 (버전 정보 제거)
5. Tailwind CSS 설정 (3.x 버전 사용)
6. globals.css 수정 (@tailwind directives 추가)
7. 캐시 정리 후 개발 서버 실행

각 단계에서 문제가 발생하면 에러 메시지를 확인하고 위 체크리스트를 참고해서 해결해주세요.
```

## 주요 문제점들과 해결책

### 문제 1: "npm run 하는데 안되네"
**원인**: package.json에 scripts 섹션이 없음
**해결책**: 
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "preview": "vite preview"
  }
}
```

### 문제 2: 모듈을 찾을 수 없음 에러
**원인**: Import 문에 버전 정보가 포함됨
**해결책**: 모든 import 문에서 `@버전번호` 제거

### 문제 3: Tailwind CSS 스타일이 적용되지 않음
**원인**: 
- Tailwind CSS 4.x와 3.x 호환성 문제
- globals.css에 @tailwind directives 없음
**해결책**: 
- Tailwind CSS 3.x 사용
- globals.css 상단에 필수 directives 추가

### 문제 4: PostCSS 플러그인 에러
**원인**: Tailwind CSS 버전에 맞지 않는 PostCSS 설정
**해결책**: 
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 권장 파일 구조
```
프로젝트/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   └── main.tsx
├── styles/
│   └── globals.css
└── components/
    ├── ui/
    └── ...
```

## 추가 팁
- 항상 Tailwind CSS 3.x 버전 사용 (4.x는 아직 호환성 문제 있음)
- UI 라이브러리 컴포넌트 파일들의 import 문은 버전 정보 없이 작성
- 설정 변경 후에는 개발 서버 재시작 필요
- 문제 발생 시 Vite 캐시 정리: `rm -rf node_modules/.vite` 