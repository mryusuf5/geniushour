<?php

class TeacherController extends CI_Controller
{
  public function __construct()
  {
    Parent::__construct();
    $this->load->model("Teachermodel");

    Header("Access-Control-Allow-Origin: *");
    Header('Access-Control-Allow-Headers: *');
    Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
  }

  public function GetAllTeachers()
  {
    $Teachers = $this->Teachermodel->GetAllTeachers();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersNameAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersNameAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersNameDesc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersNameDesc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersEmailAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersEmailAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersEmailDesc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersEmailDesc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersFieldAsc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersFieldAsc();

    echo json_encode($Teachers);
  }
  public function GetAllTeachersFieldDesc()
  {
    $Teachers = $this->Teachermodel->GetAllTeachersFieldDesc();

    echo json_encode($Teachers);
  }

  public function GetSingleTeacher()
  {
    $json = file_get_contents("php://input");
    $id = json_decode($json);

//      var_dump($id);
    $Teacher = $this->Teachermodel->GetSingleTeacher($id);

    echo json_encode($Teacher);
  }

  public function EditTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

//      var_dump($data);
    if(!empty($data[0]) && !empty($data[1]) && !empty($data[2]) && !empty($data[4]))
    {
      $this->Teachermodel->EditTeacher($data[0], $data[1], $data[2], $data[3], $data[4]);
    }
    else
    {
      $result = ["error" => "Vul alle velden in a.u.b. (voorvoegsel hoeft niet ingevult te worden)"];
      echo json_encode($result);
    }
  }

  public function DeleteTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    $this->Teachermodel->DeleteTeacher($data);
  }

  public function AddTeacher()
  {
    $json = file_get_contents("php://input");
    $data = json_decode($json);
    $teacherExists = $this->Teachermodel->GetSingleTeacherByValues($data[0], $data[1], $data[3]);

    if(!empty($data[0]) && !empty($data[1]) && !empty($data[3]) && !empty($data[4]))
    {
      if(count($teacherExists) == 0)
      {
        $result["success"] = "success";
        $this->Teachermodel->AddTeacher($data[0], $data[1], $data[2], $data[3], $data[4]);
        echo json_encode($result);
      }
      else
      {
        $result["error"] = "Deze leraar bestaat al.";
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
