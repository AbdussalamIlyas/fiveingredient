<template>
  <div class="container mt-5 mb p-4 border">
    <div class="row justify-content-center">
      <div class="col-3 mb-4">
        <h1 class="fw-light">Edit Recipe</h1>
      </div>
    </div>
    <div class="row">
      <div class="col border p-3">
        <label for="formFile" class="form-label">Change Image</label>
        <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
             class="img-fluid rounded" style="object-fit:cover; width: 600px; height: 400px;" alt="...">

        <div class="mt-2">
          <input class="form-control" type="file" id="formFile">
        </div>

      </div>
      <div class="col-7">
        <form class="border p-3">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Recipe Name</label>
            <input type="email" class="form-control" id="exampleFormControlInput1">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Direction</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
          </div>
        </form>
      </div>
    </div>
    <div class="row p-3">
      <h4 class="mt-3">Ingredient</h4>
      <div class="input-group mb-3">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <button type="button" class="btn btn-outline-primary">search</button>
      </div>
    </div>
    <div class="row border p-3 gx-2">
      <div class="col">
        <div class="card text-center p-2 mb-3">
          <span class="badge bg-warning rounded-pill w-40">102 cal</span>
          <div class="card-body">
            <h4 class="card-title">Chicken</h4>
          </div>
          <button type="button" class="btn btn-secondary"
                  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            remove</button>
        </div>
      </div>
      <div class="col">
        <div class="card text-center p-2 mb-3">
          <span class="badge bg-warning rounded-pill w-40">102 cal</span>
          <div class="card-body">
            <h4 class="card-title">Chicken</h4>
          </div>
          <button type="button" class="btn btn-secondary"
                  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            remove</button>
        </div>
      </div>


    </div>

    <div class="row justify-content-center mt-3">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EditRecipe'
}
</script>

<style scoped>

</style>
