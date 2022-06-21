<template>
  <section>
    <div style="height: 600px;background-image: url('https://images.unsplash.com/photo-1527034010651-8dcf514bd147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
                background-position: center; background-size: cover; margin-top: 10px">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
            <div class="card p-sm-5" style="max-width: 350px;">
              <h1 class="font-weight-bold">Create Your Own Recipe</h1>
              <p class="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda fugit mollitia obcaecati omnis quasi quo, voluptatum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col">
        <div class="card mb-5" style="margin-top: 50px;">
          <div class="card-body p-sm-5" style="width: 615px; height: 400px">
            <h2 class="text-left font-weight-bold mb-4">Create New Recipe</h2>
            <form method="post">
              <div class="mb-3"><input class="form-control" type="text" name="name" placeholder="Name" /></div>
              <div class="mb-3"><textarea class="form-control" name="howtocook" rows="8" placeholder="How to cook"></textarea></div>
            </form>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-5" style="margin-top: 50px; height: 400px">
          <div class="dropdown text-center">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                    style="margin-bottom: 10px; margin-top: 10px; width: 400px;">
              Ingredients
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
          <ul class="list-group" style="margin: 10px">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="d-grid gap-2 col-6 mx-auto">
    <button class="btn btn-primary" type="button" style="width: 500px; margin-bottom: 50px">Submit</button>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Moderator",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getModeratorBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
