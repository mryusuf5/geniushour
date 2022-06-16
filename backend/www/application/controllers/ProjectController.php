<?php

    class ProjectController extends CI_Controller
    {
        public function __construct()
        {
            Parent::__construct();
            $this->load->model("Projectmodel");
            $this->load->model("Studentmodel");

            Header("Access-Control-Allow-Origin: *");
            Header('Access-Control-Allow-Headers: *');
            Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        }

        public function GetAllProjects()
        {
            $projects = [];

            $projects = $this->Projectmodel->GetAllProjects();

            echo json_encode($projects);
        }

        public function GetAllProjectsByYearAsc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $result = [];
            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectIdAsc($class["classId"]);

            echo json_encode($projects);

        }

        public function GetAllProjectsByYearDesc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectIdDesc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByNameAsc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectNameAsc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByNameDesc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectNameDesc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByFieldAsc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectFieldAsc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByFieldDesc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectFieldDesc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByDurationAsc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectDurationAsc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByDurationDesc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectDurationDesc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByDifficulityAsc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectDifficulityAsc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsYearByDifficulityDesc()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $class = (array)$data;

            $projects = [];

            $projects = $this->Projectmodel->GetAllProjectsYearProjectDifficulityDesc($class["classId"]);

            echo json_encode($projects);
        }

        public function GetAllProjectsAsc()
        {
            $projects = $this->Projectmodel->GetAllProjectsIdAsc();

            echo json_encode($projects);
        }

        public function GetAllProjectsDesc()
        {
            $projects = $this->Projectmodel->GetAllProjectsIdDesc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByNameAsc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectNameAsc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByNameDesc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectNameDesc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByFieldAsc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectFieldAsc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByFieldDesc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectFieldDesc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByDurationAsc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectDurationAsc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByDurationDesc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectDurationDesc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByDifficulityAsc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectDifficulityAsc();

            echo json_encode($projects);
        }

        public function GetAllProjectsByDifficulityDesc()
        {
            $projects = $this->Projectmodel->GetAllProjectsProjectDifficulityDesc();

            echo json_encode($projects);
        }

        public function GetSingleProject()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $project = (array)$data;

            $project = $this->Projectmodel->GetSingleProject($project["projectId"]);

            echo json_encode($project);
        }

        public function EditProject()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $project = $data;
            $result = [];

            if(!empty($project[0]) && !empty($project[1]) && !empty($project[2]) && !empty($project[3]) && !empty($project[4]) && !empty($project[5]))
            {
                $this->Projectmodel->EditProject($project[0], $project[1], $project[2], $project[3], $project[4], $project[5]);
                $result["message"] = "Success";
                echo json_encode($result);
            }
            else
            {
                $result["error"] = "Vul alles in a.u.b.";
                echo json_encode($result);
            }
        }

        public function GetTeachersForSingleProject()
        {
            $json = file_get_contents("php://input");

            $data = json_decode($json);
            $project = (array)$data;

            $teachers = $this->Projectmodel->GetTeachersForSingleProject($project["projectId"]);
            echo json_encode($teachers);
        }

        public function GetAllFields()
        {
            $fields = $this->Projectmodel->GetAllFields();

            echo json_encode($fields);
        }

        public function GetAllFieldsById()
        {
            $json = file_get_contents("php://input");
            $data = json_decode($json);
            $field = (array)$data;

            $fields = $this->Projectmodel->GetFieldsById($field["fieldId"]);

            echo json_encode($fields);
        }

        public function AddNewProject()
        {
            $result = [];
            $projectExists = $this->Projectmodel->GetSingleProjectByName($_POST["projectName"]);

            if(!empty($_POST["projectName"]) && !empty($_POST["projectDescription"]) && !empty($_POST["projectDuration"]) && !empty($_POST["projectField"]) && !empty($_POST["projectDifficulity"]))
            {
                if(count($projectExists) == 0)
                {
                  $this->Projectmodel->AddNewProject($_POST["projectName"], $_POST["projectDescription"], $_POST["projectDuration"], $_POST["projectField"], $_POST["projectDifficulity"], 3);
                  $projectObject = $this->Projectmodel->GetSingleProjectByName($_POST["projectName"]);
                  $project = json_decode(json_encode($projectObject), true);
                  $fileCount = 0;
                  $targetDir = "./assets/files/";
                  foreach($_FILES["files"]["name"] as $file)
                  {
                    $targetFile = $targetDir . str_replace(" ", "_", basename($_FILES["files"]["name"][$fileCount]));
                    $fileName = str_replace(" ", "_", basename($_FILES["files"]["name"][$fileCount]));
                    move_uploaded_file($_FILES["files"]["tmp_name"][$fileCount], $targetFile);
                    $this->Projectmodel->AddSuppliesProject($project[0]["project_id"], $file, "https://yusufyildiz.nl/genieshour/backend/www/assets/files/" . $fileName);
                    $result["success"] = "success";
                    $fileCount++;
                  }
                }
                else
                {
                    $result["error"] = "Deze project bestaat al.";
                }
            }
            else
            {
                $result["error"] = "Vul alles in a.u.b.";
            }

            echo json_encode($result);
        }

        public function AddSuppliesProject()
        {
          $fileCount = 0;
          $targetDir = "./assets/files/";
          foreach($_FILES["files"]["name"] as $file)
          {
            $targetFile = $targetDir . str_replace(" ", "_", basename($_FILES["files"]["name"][$fileCount]));
            $fileName = str_replace(" ", "_", basename($_FILES["files"]["name"][$fileCount]));
            move_uploaded_file($_FILES["files"]["tmp_name"][$fileCount], $targetFile);
            $this->Projectmodel->AddSuppliesProject($_POST["projectId"], $file, "https://yusufyildiz.nl/genieshour/backend/www/assets/files/" . $fileName);
            $fileCount++;
          }
        }

        public function DeleteSupply()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $this->Projectmodel->DeleteSupply($data);
        }

        public function GetProjectSupplies()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);
          $supplies = [];

          $supplies = $this->Projectmodel->GetAllSuppliesByProjectId($data);

          echo json_encode($supplies);
        }

        public function DeleteProject()
        {
            $json = file_get_contents("php://input");
            $data = json_decode($json);
            $id = (string)$data;
            if(!empty($id))
            {
                $this->Projectmodel->deleteProject($id);
                $this->Projectmodel->DeleteSuppliesByProjectId($id);
            }
        }

        public function GetApplicationById()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $applications = $this->Projectmodel->GetApplicationById($data);

          echo json_encode($applications);
        }

        public function GetApplicationByProjectId()
      {
        $json = file_get_contents("php://input");
        $data = json_decode($json);

        $applications = $this->Projectmodel->GetApplicationByProjectId($data[0], $data[1]);

        echo json_encode($applications);
      }

        public function GetApplicationByField()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $applications = $this->Projectmodel->GetApplicationsByField($data);

          echo json_encode($applications);
        }

        public function AddApplication()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);
          if(!empty($data[0]) && !empty($data[1]) && !empty($data[2]))
          {
            $result["success"] = "Aanvraag is ingedient";
            $this->Projectmodel->AddApplication($data[0], $data[1], $data[2], $data[3]);
            echo json_encode($result);
          }
        }

        public function GetStudentProjects()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $projects = $this->Projectmodel->GetStudentProjects($data);

          echo json_encode($projects);
        }

        public function GetAllStudentProjects()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $projects = $this->Projectmodel->GetAllStudentProjects($data);

          echo json_encode($projects);
        }

        public function GetFinishedProjects()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $projects = $this->Projectmodel->GetFinishedProjects($data);

          echo json_encode($projects);
        }

        public function FinishProject()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);
          $student = $this->Studentmodel->GetSingleStudent($data[0]);
          $studentData = json_decode(json_encode($student), true);
          $studentHours = $studentData[0]["student_hours"];

          $projectHours = $data[2];
          $hoursLeft = $studentHours - $projectHours;
          if($hoursLeft <= 0)
          {
            $hoursLeft = 0;
            $this->Projectmodel->FinishProject($data[0], $data[1], $hoursLeft);
          }
          else
          {
            $this->Projectmodel->FinishProject($data[0], $data[1], $hoursLeft);
          }
        }

        public function UnfinishProject()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $this->Projectmodel->UnfinishProject($data[0], $data[1]);
        }

        public function GetStudentProject()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $projects = $this->Projectmodel->GetStudentProject($data[0], $data[1]);

          echo json_encode($projects);
        }

        public function GetApplicationsByStudentId()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $projects = $this->Projectmodel->GetApplicationsByStudentId($data[0], $data[1]);

          echo json_encode($projects);
        }

        public function DenyApplication()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $this->Projectmodel->DenyApplication($data);
        }

        public function AcceptApplication()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);
          if(!empty($data[0]) && !empty($data[1]) && !empty($data[2]))
          {
            $this->Projectmodel->AcceptApplication($data[0], $data[1], $data[2]);
            $this->Projectmodel->DenyApplication($data[3]);
          }
        }

        public function GetMessagesSingleProject()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $messages = $this->Projectmodel->GetMessagesSingleProject($data[0], $data[1]);

          echo json_encode($messages);
        }

        public function SendMessage()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);
          $result = [];

          if(!empty($data[0]))
          {
            $this->Projectmodel->SendMessage($data[0], $data[1], $data[2], $data[3], $data[4]);
            $result["success"] = "Bericht verstuurd.";
            echo json_encode($result);
          }
          else
          {
            $result["error"] = "Vul alles in a.u.b.";
            echo json_encode($result);
          }
        }

        public function UpdateProgress()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          if(isset($data[0]) && isset($data[1]) && isset($data[2]) && isset($data[3]))
          {
            $this->Projectmodel->InsertProgress($data[0], $data[1], $data[2], $data[3]);
          }
        }

        public function GetAllProgresses()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $progress = $this->Projectmodel->getProgress($data[0], $data[1]);

          echo json_encode($progress);
        }

        public function GetLatestProgress()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $progress = $this->Projectmodel->getLatestProgress($data[0], $data[1]);

          echo json_encode($progress);
        }

        public function DeleteStudentProject()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $this->Projectmodel->DeleteStudentProject($data[0], $data[1]);
        }

        public function AddField()
        {
          $json = file_get_contents("php://input");

          $fieldsObject = $this->Projectmodel->GetAllFields();
          $result = [];
          $fieldOk = true;

          $fields = json_decode(json_encode($fieldsObject), true);


          if(!empty($json))
          {
            foreach($fields as $r)
            {
              if($json == $r["field_name"])
              {
                $result["error"] = "Deze vak bestaat al.";
                $fieldOk = false;
              }
            }
            if($fieldOk == true)
            {
              $this->Projectmodel->AddField($json);
              $result["success"] = "Succesvol toegevoegd.";
            }
          }
          else
          {
            $fieldOk = false;
            $result["error"] = "Vul a.u.b. een vaknaam in.";
          }

          echo json_encode($result);
        }

        public function DeleteField()
        {
          $json = file_get_contents("php://input");
          $data = json_decode($json);

          $this->Projectmodel->DeleteField($data);
          $this->Projectmodel->DeleteProjectsByField($data);
        }
    }
