# Natural Deduction Assistant
[![Build Status](https://travis-ci.org/jackdeadman/Natural-Deduction-React.svg?branch=master)](https://travis-ci.org/jackdeadman/Natural-Deduction-React)

A web application to aid the practising of natural deduction problems. Often when practising natural deduction it can be difficult to keep your workings neat. The aim of this application is remove this problem and allow you to focus on the pure logic. The application is clever enough to apply the selected rule to the selected statements and evaluate the consequence.

Currently the application is still in Alpha, all the rules can be applied programatically. However the interface still needs to be finalised.

## Installation

Currently the only way to install the software is from source.

1. Clone the repo `git clone https://github.com/jackdeadman/Natural-Deduction-React`
2. Install the dependencies `npm install`
3. Compile the code `npm run build`
4. Open `dist/index.html` in a web browser

## Usage

![Home page of the application](https://dl.dropboxusercontent.com/s/9qupjygfvhlz2i5/Screen%20Shot%202016-08-28%20at%2011.46.15.png)

Type your premises and conclusion on the homepage and then press start. Special characters can be inputting using the corresponding characters.

| Name               | Input character   | Logic Symbol |
|:------------------:|-------------------|--------------|
| Disjunction / OR   |        +          |      ∨       |
| Conjunction / AND  |        ^          |      ∧       |
| Complement / NOT   |        ~          |      ¬       |

Currently the picture below shows the application solving the sequent. All the rules where applied programatically

![Main application] (https://dl.dropboxusercontent.com/s/rtaa94f4pl8gf8l/Screen%20Shot%202016-08-28%20at%2011.47.13.png?dl=0)


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History

Currently in pre-alpha.

## License

MIT
