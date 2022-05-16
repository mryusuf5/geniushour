<?php

  class StudentController extends CI_Controller
  {
    public function __construct()
    {
      Parent::__construct();
      $this->load->model("Studentmodel");

      Header("Access-Control-Allow-Origin: *");
      Header('Access-Control-Allow-Headers: *');
      Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    }

    public function GetAllStudents()
    {
      $students = $this->Studentmodel->GetAllStudents();

      echo json_encode($students);
    }
    public function GetAllStudentsAsc()
    {
      $students = $this->Studentmodel->GetAllStudentsAsc();

      echo json_encode($students);
    }
    public function GetAllStudentsNameAsc()
    {
      $students = $this->Studentmodel->GetAllStudentsNameAsc();

      echo json_encode($students);
    }
    public function GetAllStudentsNameDesc()
    {
      $students = $this->Studentmodel->GetAllStudentsNameDesc();

      echo json_encode($students);
    }
    public function GetAllStudentsEmailAsc()
    {
      $students = $this->Studentmodel->GetAllStudentsEmailAsc();

      echo json_encode($students);
    }
    public function GetAllStudentsEmailDesc()
    {
      $students = $this->Studentmodel->GetAllStudentsEmailDesc();

      echo json_encode($students);
    }
  }
