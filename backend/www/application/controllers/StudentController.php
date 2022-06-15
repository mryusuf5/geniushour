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

    public function GetAllClassesIdDesc()
    {
      $result = $this->Studentmodel->GetAllClassesIdDesc();

      echo json_encode($result);
    }
    public function GetAllClassesIdAsc()
    {
      $result = $this->Studentmodel->GetAllClassesIdAsc();

      echo json_encode($result);
    }
    public function GetAllClassesNameDesc()
    {
      $result = $this->Studentmodel->GetAllClassesNameDesc();

      echo json_encode($result);
    }
    public function GetAllClassesNameAsc()
    {
      $result = $this->Studentmodel->GetAllClassesNameAsc();

      echo json_encode($result);
    }
    public function GetAllClassesYearDesc()
    {
      $result = $this->Studentmodel->GetAllClassesYearDesc();

      echo json_encode($result);
    }
    public function GetAllClassesYearAsc()
    {
      $result = $this->Studentmodel->GetAllClassesYearAsc();

      echo json_encode($result);
    }

    public function AddClass()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $classes = $this->Studentmodel->GetAllClassesByClassName($data[0]);

      if(!empty($data[0]) && !empty($data[1]))
      {
        if(count($classes) == 0)
        {
          $this->Studentmodel->AddClass($data[0], $data[1]);
          $result = ["success" => "Success"];
          echo json_encode($result);
        }
        else
        {
          $result = ["error" => "Deze klas bestaat al."];
          echo json_encode($result);
        }
      }
      else
      {
        $result = ["error" => "Vul alle velden in a.u.b."];
        echo json_encode($result);
      }

    }

    public function DeleteClass()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      if(!empty($data))
      {
        $this->Studentmodel->DeleteClass($data);
        $this->Studentmodel->DeleteStudentsByClass($data);
      }
    }

    public function EditStudent()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

//      var_dump($data);
      if(!empty($data[0]) && !empty($data[1]) && !empty($data[2]) && !empty($data[3]) && !empty($data[5]) && !empty($data[6]))
      {
        $result = ["success" => "success"];
        $this->Studentmodel->EditStudent($data[0], $data[1], $data[2], $data[4], $data[3], $data[5], $data[6]);
        echo json_encode($result);
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

    public function GetMessagesStudent()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $messages = $this->Studentmodel->GetMessagesStudent($data);
      echo json_encode($messages);
    }

    public function ReadMessage()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $this->Studentmodel->MarkMessageRead($data);
    }

    public function UnreadMessage()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $this->Studentmodel->MarkMessageUnread($data);
    }

    public function DeleteMessage()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $this->Studentmodel->DeleteMessage($data[0], $data[1]);
    }

    public function GetStudentsClass()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      echo json_encode($this->Studentmodel->GetStudentsClass($data));
    }

    public function DeleteFromClass()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $this->Studentmodel->DeleteFromClass($data);
    }

    public function GetSingleClass()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      echo json_encode($this->Studentmodel->GetSingleClass($data));
    }

    public function SetStudentClass()
    {
      $json = file_get_contents("php://input");
      $data = json_decode($json);

      $this->Studentmodel->SetStudentClass($data[0], $data[1]);
    }

    public function TestEmail()
    {
      $this->load->library("email");

      $config = array();
      $config['smtp_host'] = 'smtp.transip.email';
      $config['smtp_user'] = 'genuishour@yusufyildiz.nl';
      $config['smtp_pass'] = 'MRyusuf12304560.';
      $config['smtp_port'] = 465;
      $this->email->initialize($config);
      $this->email->set_newline("\r\n");

      $this->email->from("genuishour@yusufyildiz.nl");
      $this->email->to("86794@roc-teraa.nl");
      $this->email->subject("Test");
      $this->email->message("le test lelele le test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelelele test lelele");

      if($this->email->send())
      {
        echo "email has been send";
      }
      else
      {
        show_error($this->email->print_debugger());
      }
    }
  }
