# 초록장바구니 버전2

## 버전2 변경 사항

- 공정무역·유기농·레인포레스트 얼라이언스의 주요 기준과 주의점을 비교하는 표 추가
- 모바일 하단에 장바구니 바로가기와 실시간 품목 수 표시
- 브라우저 제목, 상단 이름, 하단 이름에 ‘버전2’ 표시

윤정인의 기획서를 바탕으로 만든 간단한 웹앱입니다. HTML, CSS, JavaScript만 사용하며 별도 설치나 API 키가 필요 없습니다.

## 실행

`dist/index.html`을 브라우저로 열면 됩니다. 장바구니 저장을 일관되게 사용하려면 아래 명령으로 실행한 후 `http://localhost:8080`에 접속하세요.

```powershell
python -m http.server 8080 --directory dist
```

## 기능

- 식품명 검색 및 쉼표로 여러 음식 검색
- 초콜릿, 커피, 바나나, 쌀, 우유, 차의 가상 제품 11개
- 공정무역, 유기농, 레인포레스트 얼라이언스 설명과 공식 출처
- 검색어 누락·결과 없음·일부 결과 없음 안내와 추천 검색어
- 장바구니 추가·삭제, 구매 완료 체크, 완료한 제품 지우기
- localStorage를 이용한 브라우저별 자동 저장
- 모바일 화면 및 키보드 사용 지원

## 파일

- `dist/index.html`: 화면 구조
- `dist/style.css`: 화면 디자인과 모바일 대응
- `dist/app.js`: 예시 제품 데이터와 모든 동작

## 데이터 수정

`app.js`의 `products` 배열에서 제품을 추가하거나 수정할 수 있습니다. 인증 설명은 `certifications` 객체에 있습니다.

모든 제품과 회사는 가상의 예시입니다. 실제 제품 추천, 가격·재고 조회, 실시간 인증 검증은 제공하지 않습니다. 실제 서비스로 운영하려면 제품별 인증 출처와 적용 원료, 유효기간을 확인한 데이터를 연결해야 합니다. 인증 기준 비교표를 제공하며, 제품별 비교와 바코드 스캔은 제공하지 않습니다.

인증 설명 참고: [Fairtrade](https://www.fairtrade.net/en/why-fairtrade/how-we-do-it/standards/fairtrade-minimum-price-and-premium-information.html), [국립농산물품질관리원](https://enviagro.go.kr/portal/content/html/info/certSys.jsp), [Rainforest Alliance](https://www.rainforest-alliance.org/what-does-rainforest-alliance-certified-mean/).
