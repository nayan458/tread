# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Aed(models.Model):
    aedname = models.CharField(primary_key=True)
    uniprotid = models.CharField(blank=True, null=True)
    genename = models.CharField(blank=True, null=True)
    drugbankid = models.CharField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aed'


class Aed2(models.Model):
    aedname = models.CharField(primary_key=True)  # The composite primary key (aedname, uniprotid) found, that is not supported. The first column is selected.
    uniprotid = models.CharField()
    drugbankid = models.CharField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aed2'
        unique_together = (('aedname', 'uniprotid'),)


class Aed3(models.Model):
    aedname = models.CharField(primary_key=True)
    drugbankid = models.CharField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aed3'


class Aed4(models.Model):
    aedname = models.CharField(blank=True, null=True)
    uniprotid = models.CharField(blank=True, null=True)
    genename = models.CharField(blank=True, null=True)
    drugbankid = models.CharField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aed4'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Drugtarget(models.Model):
    uniprotid = models.CharField(primary_key=True)
    genename = models.CharField(blank=True, null=True)
    aed = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drugtarget'


class Drugtarget3(models.Model):
    uniprotid = models.CharField(primary_key=True)  # The composite primary key (uniprotid, aed) found, that is not supported. The first column is selected.
    genename = models.CharField(blank=True, null=True)
    aed = models.CharField()

    class Meta:
        managed = False
        db_table = 'drugtarget3'
        unique_together = (('uniprotid', 'aed'),)


class DrugtargetBackup(models.Model):
    uniprotid = models.CharField(blank=True, null=True)
    genename = models.CharField(blank=True, null=True)
    aed = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'drugtarget_backup'


class Features(models.Model):
    uniprotid = models.CharField(primary_key=True, max_length=10)
    genename = models.CharField(max_length=50, blank=True, null=True)
    uniprotname = models.CharField(max_length=50, blank=True, null=True)
    protein_name = models.TextField(blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    a = models.IntegerField(blank=True, null=True)
    c = models.IntegerField(blank=True, null=True)
    d = models.IntegerField(blank=True, null=True)
    e = models.IntegerField(blank=True, null=True)
    f = models.IntegerField(blank=True, null=True)
    g = models.IntegerField(blank=True, null=True)
    h = models.IntegerField(blank=True, null=True)
    i = models.IntegerField(blank=True, null=True)
    k = models.IntegerField(blank=True, null=True)
    l = models.IntegerField(blank=True, null=True)
    m = models.IntegerField(blank=True, null=True)
    n = models.IntegerField(blank=True, null=True)
    p = models.IntegerField(blank=True, null=True)
    q = models.IntegerField(blank=True, null=True)
    r = models.IntegerField(blank=True, null=True)
    s = models.IntegerField(blank=True, null=True)
    t = models.IntegerField(blank=True, null=True)
    v = models.IntegerField(blank=True, null=True)
    w = models.IntegerField(blank=True, null=True)
    y = models.IntegerField(blank=True, null=True)
    sequence = models.TextField(blank=True, null=True)
    bgeeid = models.CharField(max_length=20, blank=True, null=True)
    organexpression = models.CharField(max_length=500, blank=True, null=True)
    nlinkedglycosylation = models.IntegerField(blank=True, null=True)
    olinkedglycosylation = models.IntegerField(blank=True, null=True)
    phosphoserine = models.IntegerField(blank=True, null=True)
    phosphothreonine = models.IntegerField(blank=True, null=True)
    phosphotyrosine = models.IntegerField(blank=True, null=True)
    hydrophobicity = models.FloatField(blank=True, null=True)
    lcr = models.CharField(max_length=10, blank=True, null=True)
    isoelectricpoint = models.FloatField(blank=True, null=True)
    alphahelix = models.FloatField(blank=True, null=True)
    betastrand = models.FloatField(blank=True, null=True)
    coils = models.FloatField(blank=True, null=True)
    pestmotifs = models.FloatField(blank=True, null=True)
    brainexpression = models.CharField(max_length=5, blank=True, null=True)
    drugtarget = models.CharField(max_length=5, blank=True, null=True)
    supportvectormachine = models.CharField(max_length=5, blank=True, null=True)
    gradientboosting = models.CharField(max_length=5, blank=True, null=True)
    randomforestclassifier = models.CharField(max_length=5, blank=True, null=True)
    multilayerperceptron = models.CharField(max_length=5, blank=True, null=True)
    signal_peptide = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'features'


class UniprotAed(models.Model):
    uniprotid = models.OneToOneField(Features, models.DO_NOTHING, db_column='uniprotid', primary_key=True)  # The composite primary key (uniprotid, aedname) found, that is not supported. The first column is selected.
    aedname = models.ForeignKey(Aed3, models.DO_NOTHING, db_column='aedname')

    class Meta:
        managed = False
        db_table = 'uniprot_aed'
        unique_together = (('uniprotid', 'aedname'),)
