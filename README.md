# Weather Api

## Zadanie

Napisz aplikację dostarczającą dane o pogodzie

- Aplikacja wystawia endpoint `#GET /current_weather` który przyjmuje parametry `lat`, `lon` i `alternateSource: boolean`.

- Aplikacja w powyższym endpoint'cie zwraca aktualne dane o pogodzie dla podanych współrzędnych - przynajmniej temperaturę, ciśnienie i wilgotność, oraz informację jakie źródło danych zostało użyte

- W zależności od wartości `alternateSource` aplikacja ma korzystać z 2 różnych źródeł danych. np. API internetowych

- Korzystając z obu źródeł danych endpoint ma mieć ten sam interfejs tj. Jeżeli zwraca tylko temperaturę, ciśnienie i wilgotność przy używaniu źródła A takie same powinien zwrócić ze źródła B. Jeżeli przy danych ze źródła A temperatura jest zwracana w ‘C po przełączeniu nadal ma się tak zwracać niezależnie czy ze źródła B przychodzi w ‘C czy nie

Wskazówki

- Przykładowe API z których mogą pochodzić dane: https://rapidapi.com/blog/access-global-weather-data-with-these-weather-apis/
- Nie zostawiaj w repozytorium kluczy prywatnych do API. Skorzystaj ze zmiennych środowiskowych. ENVów.
- Zapoznaj się z wzorcem projektowym ["Adapter"](https://refactoring.guru/pl/design-patterns/adapter) [(przykład)](https://refactoring.guru/pl/design-patterns/adapter/typescript/example). Może Ci on pomóc w lepszym poukładaniu kodu w aplikacji.
- Pamiętaj o testach :). Testy znajdują się w folderze cypress/integration. Wraz z przykładowym testem `example.ts`.
- Żeby testy przechodziły pamiętaj, że musi być włączony serwer ponieważ są to testy e2e.
- Zapoznaj się z tym jak kodować w Nest'cie poniżej.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# test
$ npm run test

# test watch
$ npm run test:watch
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
