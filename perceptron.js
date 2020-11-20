class Perceptron {
  constructor(n) {
    this.weights = []
    this.lr = 0.001
    while (this.weights.length < n) {
      this.weights.push(random())
    }
  }

  predict(input) {
    if (input.length != this.weights.length) {
      console.log(`Input and weights size doesn\'t match! ${this.weights.length} ${input.length}`)
      return;
    }

    let sum = 0;

    for(let i = 0;i < this.weights.length;i++){
      sum += this.weights[i] * input[i]
    }

    return sum
  }

  train(input, target) {
    const pred = this.predict(input)
    const error = target - pred
    for(let i = 0;i < this.weights.length;i++){
      const deltaW = error * input[i] * this.lr
      this.weights[i] += deltaW
    }
  }
}

sign = (x) => {
  return x >= 0 ? 1 : -1
}

relu = (x) => {
  return x >= 0 ? x : 0
}