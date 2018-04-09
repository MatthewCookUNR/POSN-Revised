function handleClientLoad() {
        // Loads required libraries for functionality
        gapi.load('client:auth2', initClient);
      }

      function initClient() 
	  {
			// Initialize the client with API key and Client ID. Scope is set to full access
			// to Google Drive
			gapi.client.init(
			{
				apiKey: 'AIzaSyBFL7e4jh939anq2JsOUeFCTTP41Jz1GoY',
				discoveryDocs: ["https://people.googleapis.com/$discovery/rest"],
				clientId: '834692356537-5fn43u118ogta150l995623a7auu52fg.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/drive'
			}).then(function () 
			{
				// Listen for sign-in state changes
				gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

				// Handle the initial sign-in state
				updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			});
      }

	  // Function called when sign in changes
      function updateSigninStatus(isSignedIn) 
	  {
			// If status changes to signed in, makes call to Google API
			if (isSignedIn) 
			{
				gapi.client.load('drive', 'v3', makeApiCall2);
			}
      }

      function handleSignInClick(event) 
	  {
			gapi.auth2.getAuthInstance().signIn();
      }

      function handleSignOutClick(event) 
	  {
			gapi.auth2.getAuthInstance().signOut();
      }

	  
	 
	 
	 function isPOSNSetup()
	 {
		var folderName = "name= 'POSN_Directory'";
		var isTrashed = "trashed = false"
		var query = folderName + 'and' + isTrashed;
		
		//Function will essentially search for the folder that contains
		//application data to see if POSN is setup
        gapi.client.drive.files.list(
		{    
			 'q' : query
		}).then(function(response) 
		{
			console.log(response.result);
			addPermissions(response.result.files[0].id, "slayer441139@gmail.com")
			showPermissions(response.result.files[0].id)
			if( response.result.files.length == 0 )
			{
				//If folder is not found (POSN not initialized),
				//then initialize setup 
				setupPOSN();
				return;
			}
			console.log("POSN is setup");
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	 }
	 
	 function setupPOSN()
	 {
		makeApplicationFolders(); 
	 }
	 
	function showPermissions( fileID )
	{
		gapi.client.drive.permissions.list(
		{
			'fileId' : fileID
		}).then(function(response)
		{
			console.log(response.result)
		}, function(reason)
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	
	function addPermissions( fileID, emailAddress )
	{
		friendRole = "reader";
		permType = 'user';
		requestBody = {
			"type": permType,
			"emailAddress": emailAddress,
			"role": friendRole,
		}
		gapi.client.drive.permissions.create(
		{
			'fileId' : fileID,
			resource : requestBody
		}).then(function(response)
		{
			console.log(response.result)
		}, function(reason)
		{
			console.log('Error: ' + reason.result.error.message);
		});
	}
	function makeApplicationFolders()
	{
		mimeType = 'application/vnd.google-apps.folder'
		bodyMetadata = 
		{
			'name' : 'POSN_Directory',
			'mimeType' : mimeType
		}
		
		gapi.client.drive.files.create(
		{    
			resource : bodyMetadata
		}).then(function(response) 
		{
			console.log(response.result);
			
			makePhotosFolder(response.result.id);
			makeCommentsFolder(response.result.id);
			makeMusicFolder(response.result.id);
			makeVideosFolder(response.result.id);
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	}
	 
	function makePhotosFolder( directoryID )
	{
		directory = [directoryID]
		mimeType = 'application/vnd.google-apps.folder'
		name = 'Photos'
		bodyMetadata = 
		{
			'name' : name,
			'mimeType' : mimeType,
			'parents' : directory
		}
		
		gapi.client.drive.files.create(
		{    
			resource : bodyMetadata
		}).then(function(response) 
		{
			console.log(response.result);
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	}
	
	function makeCommentsFolder(directoryID)
	{
		directory = [directoryID]
		mimeType = 'application/vnd.google-apps.folder'
		name = 'Comments'
		bodyMetadata = 
		{
			'name' : name,
			'mimeType' : mimeType,
			'parents' : directory
		}
		
		gapi.client.drive.files.create(
		{    
			resource : bodyMetadata
		}).then(function(response) 
		{
			console.log(response.result);
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	}
	
	function makeMusicFolder(directoryID)
	{
		directory = [directoryID]
		mimeType = 'application/vnd.google-apps.folder'
		name = 'Music'
		bodyMetadata = 
		{
			'name' : name,
			'mimeType' : mimeType,
			'parents' : directory
		}
		
		gapi.client.drive.files.create(
		{    
			resource : bodyMetadata
		}).then(function(response) 
		{
			console.log(response.result);
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	}
	
	function makeVideosFolder(directoryID)
	{
		directory = [directoryID]
		mimeType = 'application/vnd.google-apps.folder'
		name = 'Videos'
		bodyMetadata = 
		{
			'name' : name,
			'mimeType' : mimeType,
			'parents' : directory
		}
		
		gapi.client.drive.files.create(
		{    
			resource : bodyMetadata
		}).then(function(response) 
		{
			console.log(response.result);
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	}
	
	 
	 
	 
	 
	 
	    function uploadFile() {
			/*

		
		var upload = document.getElementById("myFile");
		var file = upload.files[0];
		console.log(file);
		var reader = new FileReader();
		  reader.onload = function() {
    console.log(reader.readyState);
    console.log(reader.result);
  }
		reader.readAsText(file, "UTF-8");
		console.log(reader.results);
		
		
		if (!gapi.auth2.getAuthInstance().isSignedIn.get())
		{
			console.log("User is not logged in");
			return;
		}
        const boundary = '-------314159265358979323846264';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        var appState = file.blob;
        var fileName = file.name;
        var contentType = file.type;
        var metadata = {
          'title': fileName,
          'mimeType': contentType
        };
        var base64Data = btoa(JSON.stringify(appState));
        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;
        var request = gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
              'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});
        request.execute(function(arg) {
          console.log(arg);
        });
      
/*
		//Old upload function
	  
		//Problem: Can post but only with metadata. No idea how to input a preexisting file and get it into correct format
		var x = document.getElementById("myFile");
		alert(x);
		var file = x.files[0];
		console.log(file);
		
		gapi.client.create(
		{
			uploadType : 'media'
			'body' : file
			
		}).then(function(response)
		{
			console.log(response.result);
		}, function(reason)
		{
			console.log('Error: ' + reason.result.error.message);
		});
		*/
	  }
	  
	  function makeApiCall2()
	  {
		//Problems: order doesn't appear to change result, get give itemID and info but not actual file in postable format		
		var order = 'folder'
		var isTrashed = "trashed = false"
		var numberOfFiles = 10;
		//Function returns a list of files in google drive
        gapi.client.drive.files.list(
		{    
			 'maxResults': numberOfFiles,
			 'orderBy': order,
			 'q' : isTrashed,
		}).then(function(response) 
		{
			console.log(response.result);
			
			//Takes fileID of first item in list
			fileID = response.result.files[12].id
			console.log(fileID);
			
			//Function gets information on a file based of given file ID
			gapi.client.drive.files.get(
			{
				'fileId': fileID,
				fields: 'webContentLink'
			}).then(function(response) 
			{
				console.log(response.body);
			},function(reason)
			{
				console.log('Error: ' + reason.result.error.message);
			});
			
			/*
			myPath = '/drive/v3/files/' + fileID + '?alt=media'
			header = 'Authorization: Bearer ' + gapi.client.AccessToken
			request = gapi.client.request({
            'path': myPath,
            'method': 'GET',
			'header': header
			}).execute(function(jsonResp, rawResp) {
				console.log(jsonResp);
				console.log(rawResp);
                        //do the rest of what you need to do
                      });
					  */
			
			
			
			
        }, function(reason) 
		{
			console.log('Error: ' + reason.result.error.message);
        });
	  }