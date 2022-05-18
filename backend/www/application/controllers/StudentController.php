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
    public function GetAllStudentsHoursAsc()
    {
      $students = $this->Studentmodel->GetAllStudentsHoursAsc();

      echo json_encode($students);
    }
    public function GetAllStudentsHoursDesc()
    {
      $students = $this->Studentmodel->GetAllStudentsHoursDesc();

      echo json_encode($students);
    }
    public function GetAllStudentsNumberAsc()
    {
      $students = $this->Studentmodel->GetAllStudentsNumberAsc();

      echo json_encode($students);
    }
    public function GetAllStudentsNumberDesc()
    {
      $students = $this->Studentmodel->GetAllStudentsNumberDesc();

      echo json_encode($students);
    }

    public function GetSingleStudent()
    {
      $json = file_get_contents("php://input");
      $id = json_decode($json);

//      var_dump($id);
      $student = $this->Studentmodel->GetSingleStudent($id);

      echo json_encode($student);
    }

    public function GetAllClasses()
    {
      $result = $this->Studentmodel->GetAllClasses();

      echo json_encode($result);
    }

    public function EditStudent()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

//      var_dump($data);
      if(!empty($data[0]) && !empty($data[1]) && !empty($data[2]) && !empty($data[3]) && !empty($data[5]) && !empty($data[6]))
      {
        $this->Studentmodel->EditStudent($data[0], $data[1], $data[2], $data[4], $data[3], $data[5], $data[6]);
      }
      else
      {
        $result = ["error" => "Vul alle velden in a.u.b. (voorvoegsel hoeft niet ingevult te worden)"];
        echo json_encode($result);
      }
    }

    public function DeleteStudent()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $this->Studentmodel->DeleteStudent($data);
    }

    public function AddStudent()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);
      $studentExists = $this->Studentmodel->GetSingleStudentByValues($data[0], $data[1], $data[3]);

      if(!empty($data[0]) && !empty($data[1]) && !empty($data[3]) && !empty($data[5]) && !empty($data[6]))
      {
        if(count($studentExists) == 0)
        {
          $result["success"] = "success";
          $this->Studentmodel->AddStudent($data[0], $data[1], $data[2], $data[5], $data[6], $data[4], $data[3]);
          echo json_encode($result);
        }
        else
        {
          $result["error"] = "Deze student bestaat al.";
          echo json_encode($result);
        }
      }
      else
      {
        $result["error"] = "Vul alle velden in a.u.b.";
        echo json_encode($result);
      }
    }
  }
