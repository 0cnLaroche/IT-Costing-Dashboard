'use strict';

class Chart {
  constructor(data){
    this.data = data;
  }
  get data(){
    return this.data;
  }
  set data(data){
    this.data = data;
  }
}

class Pie extends Chart {

}

class Bar extends Chart {

}

class line extends Chart {
  
}
